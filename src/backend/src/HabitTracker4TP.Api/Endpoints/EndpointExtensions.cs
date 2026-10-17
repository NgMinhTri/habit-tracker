using System.Reflection;

namespace HabitTracker4TP.Api.Endpoints;

public static class EndpointExtensions
{
    public static IEndpointRouteBuilder MapEndpointGroups(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api");

        var groups = Assembly.GetExecutingAssembly()
            .GetTypes()
            .Where(t => t is { IsAbstract: false, IsInterface: false } && typeof(IEndpointGroup).IsAssignableFrom(t))
            .Select(t => (IEndpointGroup)Activator.CreateInstance(t)!);

        foreach (var group in groups)
        {
            group.MapEndpoints(api);
        }

        return app;
    }
}
