namespace HabitTracker4TP.Domain.Entities;

public static class HabitIcons
{
    public static readonly IReadOnlySet<string> All = new HashSet<string>(StringComparer.Ordinal)
    {
        "stretching", "stretch", "water", "running", "cycling", "swimming", "weightlifting", "walking",
        "reading", "writing", "headphones", "guitar", "piano", "art", "laptop", "brain", "globe", "sleep",
        "sunrise", "moon", "salad", "apple", "broccoli", "tea", "coffee", "tooth", "skincare", "bath",
        "cleaning", "plant", "dog", "cat", "medicine", "no-phone", "love-letter", "prayer", "sun", "star",
        "money", "target"
    };
}