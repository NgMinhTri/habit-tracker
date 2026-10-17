using HabitTracker4TP.Application.Features.Completions;
using HabitTracker4TP.Application.Features.Habits;
using HabitTracker4TP.Application.Features.Progress.Dtos;

namespace HabitTracker4TP.Application.Features.Progress;

public sealed class ProgressService(
    IHabitRepository habitRepository,
    IHabitCompletionRepository completionRepository) : IProgressService
{
    public async Task<ProgressSummaryDto> GetSummaryAsync(CancellationToken cancellationToken)
    {
        var habits = await habitRepository.ListAllAsync(cancellationToken);
        var completions = await completionRepository.ListAllAsync(cancellationToken);
        var completedByDate = completions
            .GroupBy(completion => completion.Date)
            .ToDictionary(group => group.Key, group => group.Select(completion => completion.HabitId).ToHashSet());

        var perfectDates = completedByDate.Keys
            .Where(date =>
            {
                var scheduledHabitIds = habits
                    .Where(habit => habit.IsScheduledOn(date))
                    .Select(habit => habit.Id)
                    .ToHashSet();

                return scheduledHabitIds.Count > 0 &&
                    scheduledHabitIds.IsSubsetOf(completedByDate[date]);
            })
            .Order()
            .ToArray();

        var bestStreak = 0;
        var currentStreak = 0;
        DateOnly? previousPerfectDate = null;
        foreach (var date in perfectDates)
        {
            currentStreak = previousPerfectDate.HasValue && previousPerfectDate.Value.AddDays(1) == date
                ? currentStreak + 1
                : 1;
            bestStreak = Math.Max(bestStreak, currentStreak);
            previousPerfectDate = date;
        }

        var completedDaysByHabit = completions
            .GroupBy(completion => completion.HabitId)
            .ToDictionary(group => group.Key, group => group.Select(completion => completion.Date).Distinct().Count());
        var ranking = habits
            .Select(habit => new HabitRankingDto(
                habit.Id,
                habit.Name,
                habit.Icon,
                habit.Color,
                completedDaysByHabit.GetValueOrDefault(habit.Id)))
            .OrderByDescending(habit => habit.CompletedDays)
            .ThenBy(habit => habit.Name, StringComparer.OrdinalIgnoreCase)
            .ThenBy(habit => habit.Name, StringComparer.Ordinal)
            .ToArray();

        return new ProgressSummaryDto(
            perfectDates.Length,
            bestStreak,
            completedDaysByHabit.Count,
            ranking);
    }
}