namespace HabitTracker4TP.Application.Features.Progress.Dtos;

public sealed record ProgressSummaryDto(
    int PerfectDays,
    int BestStreak,
    int TotalHabitsDone,
    IReadOnlyList<HabitRankingDto> Ranking);