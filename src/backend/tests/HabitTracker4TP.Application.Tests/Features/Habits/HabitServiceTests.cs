using HabitTracker4TP.Application.Abstractions;
using HabitTracker4TP.Application.Features.Completions;
using HabitTracker4TP.Application.Features.Habits;
using HabitTracker4TP.Application.Features.Habits.Dtos;
using HabitTracker4TP.Domain.Entities;
using NSubstitute;

namespace HabitTracker4TP.Application.Tests.Features.Habits;

public class HabitServiceTests
{
    private static readonly DateOnly StartDate = new(2026, 10, 17);
    private static readonly DateTimeOffset CreatedAt = new(2026, 10, 17, 12, 0, 0, TimeSpan.Zero);

    [Fact]
    [Trait("AC", "US01-AC1")]
    public async Task Create_ValidOneTimeHabit_TrimsNameAndPersistsHabit()
    {
        var repository = Substitute.For<IHabitRepository>();
        var clock = Substitute.For<IClock>();
        clock.UtcNow.Returns(CreatedAt);
        var service = new HabitService(repository, Substitute.For<IHabitCompletionRepository>(), clock);

        var result = await service.CreateAsync(
            new CreateHabitRequest("  Walk  ", "walking", "mint", StartDate, false, null),
            CancellationToken.None);

        Assert.True(result.IsSuccess);
        Assert.Equal("Walk", result.Habit!.Name);
        Assert.Equal("walking", result.Habit.Icon);
        Assert.Equal("mint", result.Habit.Color);
        await repository.Received(1).AddAsync(
            Arg.Is<Habit>(habit => habit.Name == "Walk" && !habit.Repeats && habit.EndDate == null),
            CancellationToken.None);
    }

    [Fact]
    [Trait("AC", "US01-AC3")]
    public async Task Create_EmptyName_ReturnsExactNameError()
    {
        var repository = Substitute.For<IHabitRepository>();
        var service = new HabitService(repository, Substitute.For<IHabitCompletionRepository>(), Substitute.For<IClock>());

        var result = await service.CreateAsync(
            new CreateHabitRequest("  ", "sun", "rose", StartDate, false, null),
            CancellationToken.None);

        Assert.False(result.IsSuccess);
        Assert.Equal("Please give your habit a name.", Assert.Single(result.Errors["name"]));
        await repository.DidNotReceive().AddAsync(Arg.Any<Habit>(), Arg.Any<CancellationToken>());
    }

    [Fact]
    [Trait("AC", "US01-AC4")]
    public async Task Create_OverlongName_ReturnsExactNameError()
    {
        var repository = Substitute.For<IHabitRepository>();
        var service = new HabitService(repository, Substitute.For<IHabitCompletionRepository>(), Substitute.For<IClock>());

        var result = await service.CreateAsync(
            new CreateHabitRequest(new string('a', 41), "sun", "rose", StartDate, false, null),
            CancellationToken.None);

        Assert.Equal("Name must be 40 characters or fewer.", Assert.Single(result.Errors["name"]));
    }

    [Fact]
    [Trait("AC", "US01-AC5")]
    public async Task Create_DuplicateNameIgnoringCase_ReturnsExactError()
    {
        var repository = Substitute.For<IHabitRepository>();
        repository.ExistsByNameAsync("stretch", Arg.Any<CancellationToken>()).Returns(true);
        var service = new HabitService(repository, Substitute.For<IHabitCompletionRepository>(), Substitute.For<IClock>());

        var result = await service.CreateAsync(
            new CreateHabitRequest(" stretch ", "stretch", "rose", StartDate, false, null),
            CancellationToken.None);

        Assert.Equal("You already have a habit called \"stretch\".", Assert.Single(result.Errors["name"]));
        await repository.DidNotReceive().AddAsync(Arg.Any<Habit>(), Arg.Any<CancellationToken>());
    }

    [Fact]
    [Trait("AC", "US01-AC6")]
    public async Task Create_EndDateBeforeStart_ReturnsExactEndDateError()
    {
        var repository = Substitute.For<IHabitRepository>();
        var service = new HabitService(repository, Substitute.For<IHabitCompletionRepository>(), Substitute.For<IClock>());

        var result = await service.CreateAsync(
            new CreateHabitRequest("Walk", "walking", "rose", StartDate, true, StartDate.AddDays(-1)),
            CancellationToken.None);

        Assert.Equal("End date must be on or after the start date.", Assert.Single(result.Errors["endDate"]));
    }

    [Fact]
    [Trait("AC", "US01-AC2")]
    public async Task Create_RepeatingHabit_PersistsEndDate()
    {
        var repository = Substitute.For<IHabitRepository>();
        var service = new HabitService(repository, Substitute.For<IHabitCompletionRepository>(), Substitute.For<IClock>());
        var endDate = StartDate.AddDays(3);

        var result = await service.CreateAsync(
            new CreateHabitRequest("Walk", "walking", "rose", StartDate, true, endDate),
            CancellationToken.None);

        Assert.True(result.IsSuccess);
        Assert.True(result.Habit!.Repeats);
        Assert.Equal(endDate, result.Habit.EndDate);
    }

    [Fact]
    [Trait("AC", "US02-AC4")]
    public async Task GetDay_NoHabits_ReturnsEmptyAccountState()
    {
        var repository = Substitute.For<IHabitRepository>();
        var completionRepository = Substitute.For<IHabitCompletionRepository>();
        repository.ListScheduledOnAsync(StartDate, Arg.Any<CancellationToken>()).Returns([]);
        repository.HasAnyAsync(Arg.Any<CancellationToken>()).Returns(false);
        completionRepository.ListHabitIdsOnAsync(StartDate, Arg.Any<CancellationToken>()).Returns([]);
        var service = new HabitService(repository, completionRepository, Substitute.For<IClock>());

        var result = await service.GetDayAsync(StartDate, CancellationToken.None);

        Assert.Equal(StartDate, result.Date);
        Assert.False(result.HasAnyHabits);
        Assert.Empty(result.Habits);
    }

    [Fact]
    [Trait("AC", "US02-AC5")]
    public async Task GetDay_HabitsExistOutsideSelectedDate_ReturnsNothingScheduledState()
    {
        var repository = Substitute.For<IHabitRepository>();
        var completionRepository = Substitute.For<IHabitCompletionRepository>();
        repository.ListScheduledOnAsync(StartDate, Arg.Any<CancellationToken>()).Returns([]);
        repository.HasAnyAsync(Arg.Any<CancellationToken>()).Returns(true);
        completionRepository.ListHabitIdsOnAsync(StartDate, Arg.Any<CancellationToken>()).Returns([]);
        var service = new HabitService(repository, completionRepository, Substitute.For<IClock>());

        var result = await service.GetDayAsync(StartDate, CancellationToken.None);

        Assert.True(result.HasAnyHabits);
        Assert.Empty(result.Habits);
    }

    [Fact]
    [Trait("AC", "US03-AC3")]
    public async Task GetDay_ReturnsCompletedHabitIdsForSelectedDate()
    {
        var repository = Substitute.For<IHabitRepository>();
        var completionRepository = Substitute.For<IHabitCompletionRepository>();
        var habitId = Guid.NewGuid();
        repository.ListScheduledOnAsync(StartDate, Arg.Any<CancellationToken>()).Returns([]);
        repository.HasAnyAsync(Arg.Any<CancellationToken>()).Returns(true);
        completionRepository.ListHabitIdsOnAsync(StartDate, Arg.Any<CancellationToken>()).Returns([habitId]);
        var service = new HabitService(repository, completionRepository, Substitute.For<IClock>());

        var result = await service.GetDayAsync(StartDate, CancellationToken.None);

        Assert.Equal([habitId], result.CompletedHabitIds);
    }
}