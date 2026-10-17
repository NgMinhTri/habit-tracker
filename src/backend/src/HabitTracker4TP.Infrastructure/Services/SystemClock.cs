using HabitTracker4TP.Application.Abstractions;

namespace HabitTracker4TP.Infrastructure.Services;

public sealed class SystemClock : IClock
{
    public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
}
