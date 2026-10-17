using HabitTracker4TP.Application.Features.Progress.Dtos;

namespace HabitTracker4TP.Application.Features.Progress;

public interface IProgressService
{
    Task<ProgressSummaryDto> GetSummaryAsync(CancellationToken cancellationToken);
}