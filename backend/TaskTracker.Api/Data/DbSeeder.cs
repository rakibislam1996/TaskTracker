using TaskTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace TaskTracker.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db, CancellationToken ct = default)
    {
        // Apply pending migrations (safety if not already done elsewhere)
        if (db.Database.GetPendingMigrations().Any())
        {
            await db.Database.MigrateAsync(ct);
        }

        if (!db.Tasks.Any())
        {
            db.Tasks.AddRange(new []
            {
                new TaskItem { Id = Guid.NewGuid(), Title = "Set up project structure", Description = "Initial scaffolding of backend GraphQL API" },
                new TaskItem { Id = Guid.NewGuid(), Title = "Implement createTask mutation", Description = "Allow adding new tasks" },
                new TaskItem { Id = Guid.NewGuid(), Title = "Wire Docker Compose", Description = "Add Postgres + API services" }
            });
            await db.SaveChangesAsync(ct);
        }
    }
}
