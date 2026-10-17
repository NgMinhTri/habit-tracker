namespace HabitTracker4TP.Application.Features.Progress.Dtos;

public sealed record HabitRankingDto(
    Guid Id,
    string Name,
    string Icon,
    string Color,
    int CompletedDays);