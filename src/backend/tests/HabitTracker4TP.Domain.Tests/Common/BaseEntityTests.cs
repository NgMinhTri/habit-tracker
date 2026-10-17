using HabitTracker4TP.Domain.Common;

namespace HabitTracker4TP.Domain.Tests.Common;

public class BaseEntityTests
{
    private sealed class TestEntity : BaseEntity;

    [Fact]
    public void Constructor_NewEntity_AssignsNonEmptyId()
    {
        var entity = new TestEntity();

        Assert.NotEqual(Guid.Empty, entity.Id);
    }

    [Fact]
    public void Constructor_TwoEntities_AssignsDistinctIds()
    {
        var first = new TestEntity();
        var second = new TestEntity();

        Assert.NotEqual(first.Id, second.Id);
    }
}
