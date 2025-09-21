using Microsoft.EntityFrameworkCore;
using TaskTracker.Api.Data;
using TaskTracker.Api.Models;

namespace TaskTracker.Api.GraphQL.Queries;

public class TaskQueries
{
    public IQueryable<TaskItem> GetAllTasks([Service] AppDbContext db)
        => db.Tasks.AsNoTracking().OrderByDescending(t => t.CreatedAt);
}
