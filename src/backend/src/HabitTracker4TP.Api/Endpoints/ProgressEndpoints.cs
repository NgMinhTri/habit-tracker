using HabitTracker4TP.Application.Features.Progress;
using HabitTracker4TP.Application.Features.Progress.Dtos;
using Microsoft.AspNetCore.Http.HttpResults;

namespace HabitTracker4TP.Api.Endpoints;

public sealed class ProgressEndpoints : IEndpointGroup
{
    public void MapEndpoints(IEndpointRouteBuilder api)
    {
        var group = api.MapGroup("/progress").WithTags("Progress");
        group.MapGet("", GetSummary).WithName("GetProgressSummary");
    }

    private static async Task<Ok<ProgressSummaryDto>> GetSummary(
        IProgressService service,
        CancellationToken cancellationToken) =>
        TypedResults.Ok(await service.GetSummaryAsync(cancellationToken));
}