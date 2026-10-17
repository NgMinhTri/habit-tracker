namespace HabitTracker4TP.Application.Abstractions;

public interface IClock
{
    DateTimeOffset UtcNow { get; }
}
