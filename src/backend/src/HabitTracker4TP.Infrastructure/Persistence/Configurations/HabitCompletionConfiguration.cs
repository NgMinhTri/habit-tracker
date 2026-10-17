using HabitTracker4TP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HabitTracker4TP.Infrastructure.Persistence.Configurations;

public sealed class HabitCompletionConfiguration : IEntityTypeConfiguration<HabitCompletion>
{
    public void Configure(EntityTypeBuilder<HabitCompletion> builder)
    {
        builder.ToTable("HabitCompletions");
        builder.HasKey(completion => completion.Id);
        builder.Property(completion => completion.HabitId).IsRequired();
        builder.Property(completion => completion.Date).IsRequired();
        builder.Property(completion => completion.CompletedAt).IsRequired();
        builder.HasIndex(completion => new { completion.HabitId, completion.Date }).IsUnique();
        builder.HasOne<Habit>()
            .WithMany()
            .HasForeignKey(completion => completion.HabitId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}