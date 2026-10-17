using HabitTracker4TP.Application.Abstractions;
using HabitTracker4TP.Application.Features.Completions.Dtos;
using HabitTracker4TP.Application.Features.Habits;
using HabitTracker4TP.Domain.Entities;

namespace HabitTracker4TP.Application.Features.Completions;

public sealed class CompletionService(
    IHabitRepository habitRepository,
    IHabitCompletionRepository completionRepository,
    IClock clock) : ICompletionService
{
    private const int MaximumRangeDays = 366;

    public async Task<CompletionOutcome> CompleteAsync(
        Guid habitId,
        DateOnly date,
        CancellationToken cancellationToken)
    {
        var habit = await habitRepository.GetByIdAsync(habitId, cancellationToken);
        if (habit is null)
        {
            return CompletionOutcome.HabitNotFound;
        }

        if (!habit.IsScheduledOn(date))
        {
            return CompletionOutcome.HabitNotScheduled;
        }

        if (!await completionRepository.ExistsAsync(habitId, date, cancellationToken))
        {
            await completionRepository.AddAsync(
                HabitCompletion.Create(habitId, date, clock.UtcNow),
                cancellationToken);
        }

        return CompletionOutcome.Success;
    }

    public async Task<CompletionOutcome> UndoAsync(
        Guid habitId,
        DateOnly date,
        CancellationToken cancellationToken)
    {
        var habit = await habitRepository.GetByIdAsync(habitId, cancellationToken);
        if (habit is null)
        {
            return CompletionOutcome.HabitNotFound;
        }

        if (!habit.IsScheduledOn(date))
        {
            return CompletionOutcome.HabitNotScheduled;
        }

        await completionRepository.RemoveAsync(habitId, date, cancellationToken);
        return CompletionOutcome.Success;
    }

    public async Task<PerfectDaysResult> GetPerfectDaysAsync(
        DateOnly from,
        DateOnly to,
        CancellationToken cancellationToken)
    {
        if (to < from)
        {
            return new PerfectDaysResult(null, new Dictionary<string, string[]>
            {
                ["to"] = ["End date must be on or after the start date."],
            });
        }

        if (to.DayNumber - from.DayNumber + 1 > MaximumRangeDays)
        {
            return new PerfectDaysResult(null, new Dictionary<string, string[]>
            {
                ["to"] = ["The date range must be 366 days or fewer."],
            });
        }

        var habits = await habitRepository.ListScheduledBetweenAsync(from, to, cancellationToken);
        var completions = await completionRepository.ListBetweenAsync(from, to, cancellationToken);
        var completedByDate = completions
            .GroupBy(completion => completion.Date)
            .ToDictionary(group => group.Key, group => group.Select(completion => completion.HabitId).ToHashSet());
        var perfectDates = new List<DateOnly>();

        for (var date = from; date <= to; date = date.AddDays(1))
        {
            var scheduledHabitIds = habits
                .Where(habit => habit.IsScheduledOn(date))
                .Select(habit => habit.Id)
                .ToHashSet();

            if (scheduledHabitIds.Count > 0 &&
                completedByDate.TryGetValue(date, out var completedHabitIds) &&
                scheduledHabitIds.IsSubsetOf(completedHabitIds))
            {
                perfectDates.Add(date);
            }
        }

        return new PerfectDaysResult(new PerfectDaysDto(perfectDates), new Dictionary<string, string[]>());
    }
}