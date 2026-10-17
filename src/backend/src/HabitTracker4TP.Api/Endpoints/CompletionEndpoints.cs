using HabitTracker4TP.Application.Features.Completions;
using HabitTracker4TP.Application.Features.Completions.Dtos;
using Microsoft.AspNetCore.Http.HttpResults;

namespace HabitTracker4TP.Api.Endpoints;

public sealed class CompletionEndpoints : IEndpointGroup
{
    public void MapEndpoints(IEndpointRouteBuilder api)
    {
        var habitCompletions = api.MapGroup("/habits/{habitId:guid}/completions").WithTags("Completions");
        habitCompletions.MapPut("/{date}", Complete)
            .WithName("CompleteHabit");
        habitCompletions.MapDelete("/{date}", Undo)
            .WithName("UndoHabitCompletion");

        var perfectDays = api.MapGroup("/perfect-days").WithTags("Completions");
        perfectDays.MapGet("", GetPerfectDays)
            .WithName("GetPerfectDays");
    }

    private static async Task<Results<NoContent, NotFound, ValidationProblem>> Complete(
        Guid habitId,
        DateOnly date,
        ICompletionService service,
        CancellationToken cancellationToken)
    {
        var outcome = await service.CompleteAsync(habitId, date, cancellationToken);
        return outcome switch
        {
            CompletionOutcome.Success => TypedResults.NoContent(),
            CompletionOutcome.HabitNotFound => TypedResults.NotFound(),
            _ => TypedResults.ValidationProblem(new Dictionary<string, string[]>
            {
                ["date"] = ["This habit is not scheduled on this date."],
            }),
        };
    }

    private static async Task<Results<NoContent, NotFound, ValidationProblem>> Undo(
        Guid habitId,
        DateOnly date,
        ICompletionService service,
        CancellationToken cancellationToken)
    {
        var outcome = await service.UndoAsync(habitId, date, cancellationToken);
        return outcome switch
        {
            CompletionOutcome.Success => TypedResults.NoContent(),
            CompletionOutcome.HabitNotFound => TypedResults.NotFound(),
            _ => TypedResults.ValidationProblem(new Dictionary<string, string[]>
            {
                ["date"] = ["This habit is not scheduled on this date."],
            }),
        };
    }

    private static async Task<Results<Ok<PerfectDaysDto>, ValidationProblem>> GetPerfectDays(
        DateOnly from,
        DateOnly to,
        ICompletionService service,
        CancellationToken cancellationToken)
    {
        var result = await service.GetPerfectDaysAsync(from, to, cancellationToken);
        if (result.Result is null)
        {
            return TypedResults.ValidationProblem(result.Errors);
        }

        return TypedResults.Ok(result.Result);
    }
}