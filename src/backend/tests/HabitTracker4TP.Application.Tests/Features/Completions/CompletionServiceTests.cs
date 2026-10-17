using HabitTracker4TP.Application.Abstractions;
using HabitTracker4TP.Application.Features.Completions;
using HabitTracker4TP.Application.Features.Habits;
using HabitTracker4TP.Domain.Entities;
using NSubstitute;

namespace HabitTracker4TP.Application.Tests.Features.Completions;

public class CompletionServiceTests
{
    private static readonly DateOnly Date = new(2026, 10, 17);
    private static readonly DateTimeOffset CompletedAt = new(2026, 10, 17, 12, 0, 0, TimeSpan.Zero);

    [Fact]
    [Trait("AC", "US03-AC1")]
    public async Task Complete_ScheduledHabit_AddsCompletion()
    {
        var habit = CreateHabit(repeats: true);
        var habits = Substitute.For<IHabitRepository>();
        var completions = Substitute.For<IHabitCompletionRepository>();
        habits.GetByIdAsync(habit.Id, Arg.Any<CancellationToken>()).Returns(habit);
        completions.ExistsAsync(habit.Id, Date, Arg.Any<CancellationToken>()).Returns(false);
        var clock = Substitute.For<IClock>();
        clock.UtcNow.Returns(CompletedAt);
        var service = new CompletionService(habits, completions, clock);

        var result = await service.CompleteAsync(habit.Id, Date, CancellationToken.None);

        Assert.Equal(CompletionOutcome.Success, result);
        await completions.Received(1).AddAsync(
            Arg.Is<HabitCompletion>(completion =>
                completion.HabitId == habit.Id && completion.Date == Date && completion.CompletedAt == CompletedAt),
            CancellationToken.None);
    }

    [Fact]
    [Trait("AC", "US03-AC1")]
    public async Task Complete_AlreadyCompleted_DoesNotAddDuplicate()
    {
        var habit = CreateHabit(repeats: true);
        var habits = Substitute.For<IHabitRepository>();
        var completions = Substitute.For<IHabitCompletionRepository>();
        habits.GetByIdAsync(habit.Id, Arg.Any<CancellationToken>()).Returns(habit);
        completions.ExistsAsync(habit.Id, Date, Arg.Any<CancellationToken>()).Returns(true);
        var service = new CompletionService(habits, completions, Substitute.For<IClock>());

        var result = await service.CompleteAsync(habit.Id, Date, CancellationToken.None);

        Assert.Equal(CompletionOutcome.Success, result);
        await completions.DidNotReceive().AddAsync(Arg.Any<HabitCompletion>(), Arg.Any<CancellationToken>());
    }

    [Fact]
    [Trait("AC", "US03-AC1")]
    public async Task Complete_UnknownHabit_ReturnsNotFound()
    {
        var habits = Substitute.For<IHabitRepository>();
        var completions = Substitute.For<IHabitCompletionRepository>();
        var habitId = Guid.NewGuid();
        habits.GetByIdAsync(habitId, Arg.Any<CancellationToken>()).Returns((Habit?)null);
        var service = new CompletionService(habits, completions, Substitute.For<IClock>());

        var result = await service.CompleteAsync(habitId, Date, CancellationToken.None);

        Assert.Equal(CompletionOutcome.HabitNotFound, result);
        await completions.DidNotReceive().AddAsync(Arg.Any<HabitCompletion>(), Arg.Any<CancellationToken>());
    }

    [Fact]
    [Trait("AC", "US03-AC1")]
    public async Task Complete_UnscheduledHabit_ReturnsNotScheduled()
    {
        var habit = CreateHabit(repeats: false);
        var habits = Substitute.For<IHabitRepository>();
        var completions = Substitute.For<IHabitCompletionRepository>();
        habits.GetByIdAsync(habit.Id, Arg.Any<CancellationToken>()).Returns(habit);
        var service = new CompletionService(habits, completions, Substitute.For<IClock>());

        var result = await service.CompleteAsync(habit.Id, Date.AddDays(1), CancellationToken.None);

        Assert.Equal(CompletionOutcome.HabitNotScheduled, result);
        await completions.DidNotReceive().AddAsync(Arg.Any<HabitCompletion>(), Arg.Any<CancellationToken>());
    }

    [Fact]
    [Trait("AC", "US03-AC2")]
    public async Task Undo_CompletedHabit_RemovesCompletion()
    {
        var habit = CreateHabit(repeats: true);
        var habits = Substitute.For<IHabitRepository>();
        var completions = Substitute.For<IHabitCompletionRepository>();
        habits.GetByIdAsync(habit.Id, Arg.Any<CancellationToken>()).Returns(habit);
        var service = new CompletionService(habits, completions, Substitute.For<IClock>());

        var result = await service.UndoAsync(habit.Id, Date, CancellationToken.None);

        Assert.Equal(CompletionOutcome.Success, result);
        await completions.Received(1).RemoveAsync(habit.Id, Date, CancellationToken.None);
    }

    [Fact]
    [Trait("AC", "US03-AC4")]
    public async Task GetPerfectDays_AllScheduledHabitsComplete_ReturnsDate()
    {
        var habit = CreateHabit(repeats: true);
        var habits = Substitute.For<IHabitRepository>();
        var completions = Substitute.For<IHabitCompletionRepository>();
        habits.ListScheduledBetweenAsync(Date, Date, Arg.Any<CancellationToken>()).Returns([habit]);
        completions.ListBetweenAsync(Date, Date, Arg.Any<CancellationToken>()).Returns(
            [HabitCompletion.Create(habit.Id, Date, CompletedAt)]);
        var service = new CompletionService(habits, completions, Substitute.For<IClock>());

        var result = await service.GetPerfectDaysAsync(Date, Date, CancellationToken.None);

        Assert.NotNull(result.Result);
        Assert.Equal([Date], result.Result.Dates);
        Assert.Empty(result.Errors);
    }

    [Fact]
    [Trait("AC", "US03-AC4")]
    public async Task GetPerfectDays_PartiallyCompletedDay_ExcludesDate()
    {
        var firstHabit = CreateHabit(repeats: true);
        var secondHabit = Habit.Create("Read", "reading", "rose", Date, true, null, CompletedAt);
        var habits = Substitute.For<IHabitRepository>();
        var completions = Substitute.For<IHabitCompletionRepository>();
        habits.ListScheduledBetweenAsync(Date, Date, Arg.Any<CancellationToken>()).Returns([firstHabit, secondHabit]);
        completions.ListBetweenAsync(Date, Date, Arg.Any<CancellationToken>()).Returns(
            [HabitCompletion.Create(firstHabit.Id, Date, CompletedAt)]);
        var service = new CompletionService(habits, completions, Substitute.For<IClock>());

        var result = await service.GetPerfectDaysAsync(Date, Date, CancellationToken.None);

        Assert.Empty(result.Result!.Dates);
    }

    [Fact]
    [Trait("AC", "US03-AC5")]
    public async Task GetPerfectDays_NoScheduledHabits_ExcludesDate()
    {
        var habits = Substitute.For<IHabitRepository>();
        var completions = Substitute.For<IHabitCompletionRepository>();
        habits.ListScheduledBetweenAsync(Date, Date, Arg.Any<CancellationToken>()).Returns([]);
        completions.ListBetweenAsync(Date, Date, Arg.Any<CancellationToken>()).Returns([]);
        var service = new CompletionService(habits, completions, Substitute.For<IClock>());

        var result = await service.GetPerfectDaysAsync(Date, Date, CancellationToken.None);

        Assert.Empty(result.Result!.Dates);
    }

    [Fact]
    public async Task GetPerfectDays_InvalidRange_ReturnsValidationError()
    {
        var habits = Substitute.For<IHabitRepository>();
        var completions = Substitute.For<IHabitCompletionRepository>();
        var service = new CompletionService(habits, completions, Substitute.For<IClock>());

        var result = await service.GetPerfectDaysAsync(Date.AddDays(1), Date, CancellationToken.None);

        Assert.Null(result.Result);
        Assert.Equal("End date must be on or after the start date.", Assert.Single(result.Errors["to"]));
        await habits.DidNotReceive().ListScheduledBetweenAsync(
            Arg.Any<DateOnly>(), Arg.Any<DateOnly>(), Arg.Any<CancellationToken>());
    }

    private static Habit CreateHabit(bool repeats) =>
        Habit.Create("Walk", "walking", "rose", Date, repeats, null, CompletedAt);
}