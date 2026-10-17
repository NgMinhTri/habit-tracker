using HabitTracker4TP.Domain.Common;

namespace HabitTracker4TP.Domain.Entities;

public sealed class Habit : BaseEntity
{
    private Habit()
    {
    }

    private Habit(
        string name,
        string icon,
        string color,
        DateOnly startDate,
        bool repeats,
        DateOnly? endDate,
        DateTimeOffset createdAt)
    {
        Name = name;
        Icon = icon;
        Color = color;
        StartDate = startDate;
        Repeats = repeats;
        EndDate = endDate;
        CreatedAt = createdAt;
    }

    public string Name { get; private set; } = string.Empty;
    public string Icon { get; private set; } = string.Empty;
    public string Color { get; private set; } = string.Empty;
    public DateOnly StartDate { get; private set; }
    public bool Repeats { get; private set; }
    public DateOnly? EndDate { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    public static IReadOnlyDictionary<string, string[]> Validate(
        string? name,
        string? icon,
        string? color,
        bool repeats,
        DateOnly startDate,
        DateOnly? endDate)
    {
        var errors = new Dictionary<string, string[]>();
        var trimmedName = name?.Trim() ?? string.Empty;

        if (trimmedName.Length == 0)
        {
            errors["name"] = ["Please give your habit a name."];
        }
        else if (trimmedName.Length > 40)
        {
            errors["name"] = ["Name must be 40 characters or fewer."];
        }

        if (icon is null || !HabitIcons.All.Contains(icon))
        {
            errors["icon"] = ["Choose an icon."];
        }

        if (color is null || !HabitColors.All.Contains(color))
        {
            errors["color"] = ["Choose a color."];
        }

        if (repeats && endDate.HasValue && endDate.Value < startDate)
        {
            errors["endDate"] = ["End date must be on or after the start date."];
        }

        return errors;
    }

    public static Habit Create(
        string name,
        string icon,
        string color,
        DateOnly startDate,
        bool repeats,
        DateOnly? endDate,
        DateTimeOffset createdAt)
    {
        var errors = Validate(name, icon, color, repeats, startDate, endDate);
        if (errors.Count > 0)
        {
            throw new ArgumentException("Habit data must be valid before creation.");
        }

        return new Habit(name.Trim(), icon, color, startDate, repeats, repeats ? endDate : null, createdAt);
    }

    public bool IsScheduledOn(DateOnly date) =>
        date >= StartDate &&
        (Repeats ? !EndDate.HasValue || date <= EndDate.Value : date == StartDate);
}