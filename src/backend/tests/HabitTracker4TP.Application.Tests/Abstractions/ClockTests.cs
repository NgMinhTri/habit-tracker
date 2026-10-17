using HabitTracker4TP.Application.Abstractions;
using HabitTracker4TP.Infrastructure.Services;
using NSubstitute;

namespace HabitTracker4TP.Application.Tests.Abstractions;

public class ClockTests
{
    [Fact]
    public void SystemClock_UtcNow_ReturnsUtcOffset()
    {
        var clock = new SystemClock();

        Assert.Equal(TimeSpan.Zero, clock.UtcNow.Offset);
    }

    [Fact]
    public void IClock_Substitute_ReturnsConfiguredTime()
    {
        var fixedTime = new DateTimeOffset(2026, 1, 1, 0, 0, 0, TimeSpan.Zero);
        var clock = Substitute.For<IClock>();
        clock.UtcNow.Returns(fixedTime);

        Assert.Equal(fixedTime, clock.UtcNow);
    }
}
