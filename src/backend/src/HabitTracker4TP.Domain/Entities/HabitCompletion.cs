using HabitTracker4TP.Domain.Common;

namespace HabitTracker4TP.Domain.Entities;

public sealed class HabitCompletion : BaseEntity
{
    private HabitCompletion()
    {
    }

    private HabitCompletion(Guid habitId, DateOnly date, DateTimeOffset completedAt)
    {
        HabitId = habitId;
        Date = date;
        CompletedAt = completedAt;
    }

    public Guid HabitId { get; private set; }
    public DateOnly Date { get; private set; }
    public DateTimeOffset CompletedAt { get; private set; }

    public static HabitCompletion Create(Guid habitId, DateOnly date, DateTimeOffset completedAt) =>
        new(habitId, date, completedAt);
}