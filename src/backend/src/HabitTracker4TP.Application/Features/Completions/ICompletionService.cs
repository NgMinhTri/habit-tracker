using HabitTracker4TP.Application.Features.Completions.Dtos;

namespace HabitTracker4TP.Application.Features.Completions;

public interface ICompletionService
{
    Task<CompletionOutcome> CompleteAsync(Guid habitId, DateOnly date, CancellationToken cancellationToken);
    Task<CompletionOutcome> UndoAsync(Guid habitId, DateOnly date, CancellationToken cancellationToken);
    Task<PerfectDaysResult> GetPerfectDaysAsync(
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken);
}