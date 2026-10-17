using HabitTracker4TP.Application.Abstractions;
using HabitTracker4TP.Application.Features.Completions;
using HabitTracker4TP.Application.Features.Habits;
using HabitTracker4TP.Infrastructure.Persistence;
using HabitTracker4TP.Infrastructure.Persistence.Repositories;
using HabitTracker4TP.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HabitTracker4TP.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Default")
            ?? throw new InvalidOperationException("Connection string 'Default' is not configured.");

        services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));
        services.AddSingleton<IClock, SystemClock>();
        services.AddScoped<IHabitRepository, HabitRepository>();
        services.AddScoped<IHabitCompletionRepository, HabitCompletionRepository>();

        return services;
    }
}
