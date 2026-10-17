using HabitTracker4TP.Application.Features.Habits;
using HabitTracker4TP.Application.Features.Habits.Dtos;
using Microsoft.AspNetCore.Http.HttpResults;

namespace HabitTracker4TP.Api.Endpoints;

public sealed class HabitEndpoints : IEndpointGroup
{
    public void MapEndpoints(IEndpointRouteBuilder api)
    {
        var group = api.MapGroup("/habits").WithTags("Habits");
        group.MapPost("", Create)
            .WithName("CreateHabit");
        group.MapGet("", GetScheduled)
            .WithName("GetScheduledHabits");
    }

    private static async Task<Results<Created<HabitDto>, ValidationProblem>> Create(
        CreateHabitRequest request,
        IHabitService service,
        CancellationToken cancellationToken)
    {
        var result = await service.CreateAsync(request, cancellationToken);
        if (result.Habit is null)
        {
            return TypedResults.ValidationProblem(result.Errors);
        }

        return TypedResults.Created($"/api/habits/{result.Habit.Id}", result.Habit);
    }

    private static async Task<Ok<HabitDayDto>> GetScheduled(
        DateOnly date,
        IHabitService service,
        CancellationToken cancellationToken) =>
        TypedResults.Ok(await service.GetDayAsync(date, cancellationToken));
}