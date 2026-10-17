using HabitTracker4TP.Application.Features.Completions;
using HabitTracker4TP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HabitTracker4TP.Infrastructure.Persistence.Repositories;

public sealed class HabitCompletionRepository(AppDbContext dbContext) : IHabitCompletionRepository
{
    public Task<bool> ExistsAsync(Guid habitId, DateOnly date, CancellationToken cancellationToken) =>
        dbContext.HabitCompletions.AnyAsync(
            completion => completion.HabitId == habitId && completion.Date == date,
            cancellationToken);

    public async Task AddAsync(HabitCompletion completion, CancellationToken cancellationToken)
    {
        await dbContext.HabitCompletions.AddAsync(completion, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveAsync(Guid habitId, DateOnly date, CancellationToken cancellationToken)
    {
        var completion = await dbContext.HabitCompletions.FirstOrDefaultAsync(
            item => item.HabitId == habitId && item.Date == date,
            cancellationToken);

        if (completion is null)
        {
            return;
        }

        dbContext.HabitCompletions.Remove(completion);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<HabitCompletion>> ListAllAsync(CancellationToken cancellationToken) =>
        await dbContext.HabitCompletions.AsNoTracking().ToListAsync(cancellationToken);

    public async Task<IReadOnlyList<Guid>> ListHabitIdsOnAsync(DateOnly date, CancellationToken cancellationToken) =>
        await dbContext.HabitCompletions
            .AsNoTracking()
            .Where(completion => completion.Date == date)
            .Select(completion => completion.HabitId)
            .ToListAsync(cancellationToken);

    public async Task<IReadOnlyList<HabitCompletion>> ListBetweenAsync(
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken) =>
        await dbContext.HabitCompletions
            .AsNoTracking()
            .Where(completion => completion.Date >= from && completion.Date <= to)
            .ToListAsync(cancellationToken);
}