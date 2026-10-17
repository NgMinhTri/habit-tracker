using HabitTracker4TP.Application.Features.Completions;
using HabitTracker4TP.Application.Features.Habits;
using HabitTracker4TP.Application.Features.Progress;
using HabitTracker4TP.Domain.Entities;
using NSubstitute;

namespace HabitTracker4TP.Application.Tests.Features.Progress;

public class ProgressServiceTests
{
    private static readonly DateOnly Today = new(2026, 10, 17);
    private static readonly DateTimeOffset CompletedAt = new(2026, 10, 17, 12, 0, 0, TimeSpan.Zero);

    [Fact]
    [Trait("AC", "US04-AC2")]
    [Trait("AC", "US04-AC4")]
    public async Task GetSummary_History_ReturnsRecordStatisticsAndRankedHabits()
    {
        var walk = CreateHabit("Walk", true);
        var read = CreateHabit("Read", true);
        var meditate = CreateHabit("Meditate", true, Today.AddDays(1));
        var completions = new[]
        {
            CreateCompletion(walk, Today),
            CreateCompletion(walk, Today.AddDays(-1)),
            CreateCompletion(read, Today),
            CreateCompletion(read, Today.AddDays(-1)),
        };
        var service = CreateService([walk, read, meditate], completions);

        var result = await service.GetSummaryAsync(CancellationToken.None);

        Assert.Equal(2, result.PerfectDays);
        Assert.Equal(2, result.BestStreak);
        Assert.Equal(2, result.TotalHabitsDone);
        Assert.Equal(["Read", "Walk", "Meditate"], result.Ranking.Select(habit => habit.Name));
        Assert.Equal([2, 2, 0], result.Ranking.Select(habit => habit.CompletedDays));
    }

    [Fact]
    [Trait("AC", "US04-AC3")]
    public async Task GetSummary_GapBetweenRuns_ReturnsLongestStreak()
    {
        var habit = CreateHabit("Walk", true, Today.AddDays(-10));
        var perfectDates = new[]
        {
            Today.AddDays(-10), Today.AddDays(-7), Today.AddDays(-6),
            Today.AddDays(-3), Today.AddDays(-2), Today.AddDays(-1),
        };
        var service = CreateService([habit], perfectDates.Select(date => CreateCompletion(habit, date)));

        var result = await service.GetSummaryAsync(CancellationToken.None);

        Assert.Equal(6, result.PerfectDays);
        Assert.Equal(3, result.BestStreak);
    }

    [Fact]
    [Trait("AC", "US04-AC3")]
    public async Task GetSummary_UnscheduledDateBetweenOneTimeHabits_BreaksStreak()
    {
        var first = CreateHabit("First", false, Today.AddDays(-2));
        var second = CreateHabit("Second", false, Today);
        var service = CreateService(
            [first, second],
            [CreateCompletion(first, Today.AddDays(-2)), CreateCompletion(second, Today)]);

        var result = await service.GetSummaryAsync(CancellationToken.None);

        Assert.Equal(2, result.PerfectDays);
        Assert.Equal(1, result.BestStreak);
    }

    [Fact]
    [Trait("AC", "US04-AC2")]
    public async Task GetSummary_RepeatedCheckOffs_CountsDistinctHabitsDone()
    {
        var habit = CreateHabit("Walk", true, Today.AddDays(-2));
        var service = CreateService(
            [habit],
            [CreateCompletion(habit, Today.AddDays(-1)), CreateCompletion(habit, Today)]);

        var result = await service.GetSummaryAsync(CancellationToken.None);

        Assert.Equal(1, result.TotalHabitsDone);
    }

    [Fact]
    [Trait("AC", "US04-AC2")]
    public async Task GetSummary_PartiallyCompletedDate_IsNotPerfect()
    {
        var completed = CreateHabit("Walk", true, Today);
        var incomplete = CreateHabit("Read", true, Today);
        var service = CreateService([completed, incomplete], [CreateCompletion(completed, Today)]);

        var result = await service.GetSummaryAsync(CancellationToken.None);

        Assert.Equal(0, result.PerfectDays);
        Assert.Equal(0, result.BestStreak);
    }

    [Fact]
    [Trait("AC", "US04-AC5")]
    public async Task GetSummary_NoHabits_ReturnsZeroRecordsAndEmptyRanking()
    {
        var service = CreateService([], []);

        var result = await service.GetSummaryAsync(CancellationToken.None);

        Assert.Equal(0, result.PerfectDays);
        Assert.Equal(0, result.BestStreak);
        Assert.Equal(0, result.TotalHabitsDone);
        Assert.Empty(result.Ranking);
    }

    private static ProgressService CreateService(
        IReadOnlyList<Habit> habits,
        IEnumerable<HabitCompletion> completions)
    {
        var habitRepository = Substitute.For<IHabitRepository>();
        var completionRepository = Substitute.For<IHabitCompletionRepository>();
        habitRepository.ListAllAsync(Arg.Any<CancellationToken>()).Returns(habits);
        completionRepository.ListAllAsync(Arg.Any<CancellationToken>()).Returns(completions.ToArray());
        return new ProgressService(habitRepository, completionRepository);
    }

    private static Habit CreateHabit(string name, bool repeats, DateOnly? startDate = null) =>
        Habit.Create(name, "walking", "rose", startDate ?? Today.AddDays(-20), repeats, null, CompletedAt);

    private static HabitCompletion CreateCompletion(Habit habit, DateOnly date) =>
        HabitCompletion.Create(habit.Id, date, CompletedAt);
}