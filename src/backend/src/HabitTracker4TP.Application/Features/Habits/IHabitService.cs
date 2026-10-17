using HabitTracker4TP.Application.Features.Habits.Dtos;

namespace HabitTracker4TP.Application.Features.Habits;

public interface IHabitService
{
    Task<CreateHabitResult> CreateAsync(CreateHabitRequest request, CancellationToken cancellationToken);
    Task<HabitDayDto> GetDayAsync(DateOnly date, CancellationToken cancellationToken);
}