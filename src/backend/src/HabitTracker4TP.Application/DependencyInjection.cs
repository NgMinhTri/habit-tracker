using Microsoft.Extensions.DependencyInjection;
using HabitTracker4TP.Application.Features.Completions;
using HabitTracker4TP.Application.Features.Habits;
using HabitTracker4TP.Application.Features.Progress;

namespace HabitTracker4TP.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IHabitService, HabitService>();
        services.AddScoped<ICompletionService, CompletionService>();
        services.AddScoped<IProgressService, ProgressService>();
        return services;
    }
}
