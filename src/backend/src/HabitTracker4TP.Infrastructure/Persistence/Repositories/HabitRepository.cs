using HabitTracker4TP.Application.Features.Habits;
using HabitTracker4TP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HabitTracker4TP.Infrastructure.Persistence.Repositories;

public sealed class HabitRepository(AppDbContext dbContext) : IHabitRepository
{
    public Task<bool> ExistsByNameAsync(string name, CancellationToken cancellationToken) =>
        dbContext.Habits.AnyAsync(habit => habit.Name == name, cancellationToken);

    public Task<bool> HasAnyAsync(CancellationToken cancellationToken) =>
        dbContext.Habits.AnyAsync(cancellationToken);

    public Task<Habit?> GetByIdAsync(Guid id, CancellationToken cancellationToken) =>
        dbContext.Habits.FirstOrDefaultAsync(habit => habit.Id == id, cancellationToken);

    public async Task AddAsync(Habit habit, CancellationToken cancellationToken)
    {
        await dbContext.Habits.AddAsync(habit, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Habit>> ListAllAsync(CancellationToken cancellationToken) =>
        await dbContext.Habits.AsNoTracking().ToListAsync(cancellationToken);

    public async Task<IReadOnlyList<Habit>> ListScheduledOnAsync(DateOnly date, CancellationToken cancellationToken)
    {
        var habits = await dbContext.Habits
            .AsNoTracking()
            .Where(habit =>
                (habit.Repeats && habit.StartDate <= date && (!habit.EndDate.HasValue || habit.EndDate >= date)) ||
                (!habit.Repeats && habit.StartDate == date))
            .ToListAsync(cancellationToken);

        // SQLite cannot ORDER BY DateTimeOffset, so sort after materializing.
        return habits.OrderBy(habit => habit.CreatedAt).ToArray();
    }

    public async Task<IReadOnlyList<Habit>> ListScheduledBetweenAsync(
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken)
    {
        var habits = await dbContext.Habits
            .AsNoTracking()
            .Where(habit =>
                (habit.Repeats && habit.StartDate <= to && (!habit.EndDate.HasValue || habit.EndDate >= from)) ||
                (!habit.Repeats && habit.StartDate >= from && habit.StartDate <= to))
            .ToListAsync(cancellationToken);

        return habits;
    }
}