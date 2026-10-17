using HabitTracker4TP.Domain.Entities;

namespace HabitTracker4TP.Application.Features.Completions;

public interface IHabitCompletionRepository
{
    Task<bool> ExistsAsync(Guid habitId, DateOnly date, CancellationToken cancellationToken);
    Task AddAsync(HabitCompletion completion, CancellationToken cancellationToken);
    Task RemoveAsync(Guid habitId, DateOnly date, CancellationToken cancellationToken);
    Task<IReadOnlyList<HabitCompletion>> ListAllAsync(CancellationToken cancellationToken);
    Task<IReadOnlyList<Guid>> ListHabitIdsOnAsync(DateOnly date, CancellationToken cancellationToken);
    Task<IReadOnlyList<HabitCompletion>> ListBetweenAsync(
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken);
}