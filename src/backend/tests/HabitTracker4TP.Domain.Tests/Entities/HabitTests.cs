using HabitTracker4TP.Domain.Entities;

namespace HabitTracker4TP.Domain.Tests.Entities;

public class HabitTests
{
    private static readonly DateOnly StartDate = new(2026, 10, 17);
    private static readonly DateTimeOffset CreatedAt = new(2026, 10, 17, 12, 0, 0, TimeSpan.Zero);

    [Fact]
    [Trait("AC", "US01-AC1")]
    public void IsScheduledOn_OneTimeHabit_MatchesOnlyStartDate()
    {
        var habit = CreateHabit(repeats: false);

        Assert.True(habit.IsScheduledOn(StartDate));
        Assert.False(habit.IsScheduledOn(StartDate.AddDays(-1)));
        Assert.False(habit.IsScheduledOn(StartDate.AddDays(1)));
    }

    [Fact]
    [Trait("AC", "US01-AC2")]
    public void IsScheduledOn_RepeatingHabitWithEndDate_IncludesBothBoundaries()
    {
        var habit = CreateHabit(repeats: true, endDate: StartDate.AddDays(2));

        Assert.False(habit.IsScheduledOn(StartDate.AddDays(-1)));
        Assert.True(habit.IsScheduledOn(StartDate));
        Assert.True(habit.IsScheduledOn(StartDate.AddDays(2)));
        Assert.False(habit.IsScheduledOn(StartDate.AddDays(3)));
    }

    [Fact]
    [Trait("AC", "US01-AC2")]
    public void IsScheduledOn_RepeatingHabitWithoutEndDate_ContinuesIndefinitely()
    {
        var habit = CreateHabit(repeats: true);

        Assert.True(habit.IsScheduledOn(StartDate.AddYears(5)));
    }

    [Fact]
    [Trait("AC", "US01-AC3")]
    public void Validate_WhitespaceName_ReturnsExactNameError()
    {
        var errors = Habit.Validate("   ", "sun", "rose", false, StartDate, null);

        Assert.Equal("Please give your habit a name.", Assert.Single(errors["name"]));
    }

    [Fact]
    [Trait("AC", "US01-AC4")]
    public void Validate_NameLength_AllowsFortyAndRejectsFortyOneCharacters()
    {
        var valid = Habit.Validate(new string('a', 40), "sun", "rose", false, StartDate, null);
        var invalid = Habit.Validate(new string('a', 41), "sun", "rose", false, StartDate, null);

        Assert.False(valid.ContainsKey("name"));
        Assert.Equal("Name must be 40 characters or fewer.", Assert.Single(invalid["name"]));
    }

    [Fact]
    [Trait("AC", "US01-AC6")]
    public void Validate_EndDateBeforeStart_ReturnsExactEndDateError()
    {
        var errors = Habit.Validate("Walk", "walking", "rose", true, StartDate, StartDate.AddDays(-1));

        Assert.Equal("End date must be on or after the start date.", Assert.Single(errors["endDate"]));
    }

    [Fact]
    public void Create_TrimsNameAndIgnoresEndDateForOneTimeHabit()
    {
        var habit = Habit.Create("  Walk  ", "walking", "rose", StartDate, false, StartDate.AddDays(1), CreatedAt);

        Assert.Equal("Walk", habit.Name);
        Assert.Null(habit.EndDate);
    }

    private static Habit CreateHabit(bool repeats, DateOnly? endDate = null) =>
        Habit.Create("Walk", "walking", "rose", StartDate, repeats, endDate, CreatedAt);
}