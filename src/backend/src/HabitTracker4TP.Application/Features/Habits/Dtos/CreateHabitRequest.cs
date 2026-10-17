namespace HabitTracker4TP.Application.Features.Habits.Dtos;

public sealed record CreateHabitRequest(
    string? Name,
    string? Icon,
    string? Color,
    DateOnly StartDate,
    bool Repeats,
    DateOnly? EndDate);