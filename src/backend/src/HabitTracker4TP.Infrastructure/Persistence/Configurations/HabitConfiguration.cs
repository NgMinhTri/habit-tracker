using HabitTracker4TP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HabitTracker4TP.Infrastructure.Persistence.Configurations;

public sealed class HabitConfiguration : IEntityTypeConfiguration<Habit>
{
    public void Configure(EntityTypeBuilder<Habit> builder)
    {
        builder.ToTable("Habits");
        builder.HasKey(habit => habit.Id);
        builder.Property(habit => habit.Name).HasMaxLength(40).UseCollation("NOCASE").IsRequired();
        builder.HasIndex(habit => habit.Name).IsUnique();
        builder.Property(habit => habit.Icon).HasMaxLength(40).IsRequired();
        builder.Property(habit => habit.Color).HasMaxLength(16).IsRequired();
        builder.Property(habit => habit.StartDate).IsRequired();
        builder.Property(habit => habit.Repeats).IsRequired();
        builder.Property(habit => habit.CreatedAt).IsRequired();
    }
}