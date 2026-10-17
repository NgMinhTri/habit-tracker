namespace HabitTracker4TP.Application.Features.Habits.Dtos;

public sealed record HabitDayDto(
    DateOnly Date,
    bool HasAnyHabits,
    IReadOnlyList<HabitDto> Habits,
    IReadOnlyList<Guid> CompletedHabitIds);