using HabitTracker4TP.Application.Abstractions;
using HabitTracker4TP.Application.Features.Completions;
using HabitTracker4TP.Application.Features.Habits.Dtos;
using HabitTracker4TP.Domain.Entities;

namespace HabitTracker4TP.Application.Features.Habits;

public sealed class HabitService(
    IHabitRepository repository,
    IHabitCompletionRepository completionRepository,
    IClock clock) : IHabitService
{
    public async Task<CreateHabitResult> CreateAsync(CreateHabitRequest request, CancellationToken cancellationToken)
    {
        var errors = Habit.Validate(request.Name, request.Icon, request.Color, request.Repeats, request.StartDate, request.EndDate)
            .ToDictionary(pair => pair.Key, pair => pair.Value);

        if (errors.Count > 0)
        {
            return new CreateHabitResult(null, errors);
        }

        var trimmedName = request.Name!.Trim();
        if (await repository.ExistsByNameAsync(trimmedName, cancellationToken))
        {
            errors["name"] = [$"You already have a habit called \"{trimmedName}\"."];
            return new CreateHabitResult(null, errors);
        }

        var habit = Habit.Create(
            trimmedName,
            request.Icon!,
            request.Color!,
            request.StartDate,
            request.Repeats,
            request.EndDate,
            clock.UtcNow);
        await repository.AddAsync(habit, cancellationToken);

        return new CreateHabitResult(ToDto(habit), new Dictionary<string, string[]>());
    }

    public async Task<HabitDayDto> GetDayAsync(DateOnly date, CancellationToken cancellationToken)
    {
        var habits = await repository.ListScheduledOnAsync(date, cancellationToken);
        var hasAnyHabits = await repository.HasAnyAsync(cancellationToken);
        var completedHabitIds = await completionRepository.ListHabitIdsOnAsync(date, cancellationToken);
        return new HabitDayDto(date, hasAnyHabits, habits.Select(ToDto).ToArray(), completedHabitIds);
    }

    private static HabitDto ToDto(Habit habit) => new(
        habit.Id,
        habit.Name,
        habit.Icon,
        habit.Color,
        habit.StartDate,
        habit.Repeats,
        habit.EndDate);
}