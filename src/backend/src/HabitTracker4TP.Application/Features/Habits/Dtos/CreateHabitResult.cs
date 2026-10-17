namespace HabitTracker4TP.Application.Features.Habits.Dtos;

public sealed record CreateHabitResult(HabitDto? Habit, IReadOnlyDictionary<string, string[]> Errors)
{
    public bool IsSuccess => Habit is not null;
}