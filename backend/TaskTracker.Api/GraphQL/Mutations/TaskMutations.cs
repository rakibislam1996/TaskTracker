using Microsoft.EntityFrameworkCore;
using TaskTracker.Api.Data;
using TaskItem = TaskTracker.Api.Models.TaskItem;
using TaskStatusEnum = TaskTracker.Api.Models.TaskStatus;

namespace TaskTracker.Api.GraphQL.Mutations;

public class TaskMutations
{
    private const int MaxTitleLength = 200;
    private const int MaxDescriptionLength = 2000;

    public async Task<TaskItem> CreateTaskAsync(string title, string? description, [Service] AppDbContext db, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new GraphQLException(ErrorBuilder.New().SetMessage("Title is required").Build());

        title = title.Trim();
        if (title.Length > MaxTitleLength)
            throw new GraphQLException(ErrorBuilder.New().SetMessage($"Title length must be <= {MaxTitleLength}").Build());

        if (!string.IsNullOrWhiteSpace(description))
        {
            description = description.Trim();
            if (description.Length > MaxDescriptionLength)
                throw new GraphQLException(ErrorBuilder.New().SetMessage($"Description length must be <= {MaxDescriptionLength}").Build());
        }

        var entity = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = title,
            Description = string.IsNullOrWhiteSpace(description) ? null : description,
            Status = TaskStatusEnum.Pending
        };
        db.Tasks.Add(entity);
        await db.SaveChangesAsync(ct);
        return entity;
    }

    public async Task<TaskItem> UpdateTaskStatusAsync(Guid id, TaskStatusEnum status, [Service] AppDbContext db, CancellationToken ct)
    {
        var entity = await db.Tasks.FirstOrDefaultAsync(t => t.Id == id, ct);
        if (entity == null)
            throw new GraphQLException(ErrorBuilder.New().SetMessage("Task not found").Build());

        entity.Status = status;
        await db.SaveChangesAsync(ct);
        return entity;
    }
}
