namespace HabitTracker4TP.Domain.Entities;

public static class HabitColors
{
    public static readonly IReadOnlySet<string> All = new HashSet<string>(StringComparer.Ordinal)
    {
        "rose", "peach", "yellow", "green", "mint", "blue", "lilac"
    };
}