namespace HabitTracker4TP.Application.Features.Habits.Dtos;

public sealed record HabitDto(
    Guid Id,
    string Name,
    string Icon,
    string Color,
    DateOnly StartDate,
    bool Repeats,
    DateOnly? EndDate);