namespace HabitTracker4TP.Application.Features.Completions.Dtos;

public sealed record PerfectDaysResult(
    PerfectDaysDto? Result,
    IReadOnlyDictionary<string, string[]> Errors);