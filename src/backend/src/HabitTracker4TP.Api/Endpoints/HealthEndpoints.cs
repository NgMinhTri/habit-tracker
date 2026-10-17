using HabitTracker4TP.Application.Abstractions;
using HabitTracker4TP.Infrastructure.Persistence;

namespace HabitTracker4TP.Api.Endpoints;

public sealed class HealthEndpoints : IEndpointGroup
{
    public void MapEndpoints(IEndpointRouteBuilder api)
    {
        api.MapGet("/health", GetHealth)
            .WithName("GetHealth")
            .WithTags("Health");
    }

    private static async Task<IResult> GetHealth(AppDbContext db, IClock clock, CancellationToken ct)
    {
        var databaseConnected = await db.Database.CanConnectAsync(ct);

        return TypedResults.Ok(new HealthResponse(
            databaseConnected ? "healthy" : "degraded",
            databaseConnected,
            clock.UtcNow));
    }

    public sealed record HealthResponse(string Status, bool DatabaseConnected, DateTimeOffset Timestamp);
}
