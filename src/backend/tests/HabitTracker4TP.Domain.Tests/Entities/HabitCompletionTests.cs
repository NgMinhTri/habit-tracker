using HabitTracker4TP.Domain.Entities;

namespace HabitTracker4TP.Domain.Tests.Entities;

public class HabitCompletionTests
{
    [Fact]
    [Trait("AC", "US03-AC1")]
    public void Create_Completion_AssignsHabitDateAndTimestamp()
    {
        var habitId = Guid.NewGuid();
        var date = new DateOnly(2026, 10, 17);
        var completedAt = new DateTimeOffset(2026, 10, 17, 12, 0, 0, TimeSpan.Zero);

        var completion = HabitCompletion.Create(habitId, date, completedAt);

        Assert.Equal(habitId, completion.HabitId);
        Assert.Equal(date, completion.Date);
        Assert.Equal(completedAt, completion.CompletedAt);
    }
}