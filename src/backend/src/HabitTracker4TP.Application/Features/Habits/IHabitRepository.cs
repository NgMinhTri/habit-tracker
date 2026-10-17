using HabitTracker4TP.Domain.Entities;

namespace HabitTracker4TP.Application.Features.Habits;

public interface IHabitRepository
{
    Task<bool> ExistsByNameAsync(string name, CancellationToken cancellationToken);
    Task<bool> HasAnyAsync(CancellationToken cancellationToken);
    Task<Habit?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task AddAsync(Habit habit, CancellationToken cancellationToken);
    Task<IReadOnlyList<Habit>> ListAllAsync(CancellationToken cancellationToken);
    Task<IReadOnlyList<Habit>> ListScheduledOnAsync(DateOnly date, CancellationToken cancellationToken);
    Task<IReadOnlyList<Habit>> ListScheduledBetweenAsync(
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken);
}