using Microsoft.EntityFrameworkCore;
using TaskTracker.Api.Models;

namespace TaskTracker.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var task = modelBuilder.Entity<TaskItem>();
        task.ToTable("tasks");
        task.Property(t => t.Title).IsRequired().HasMaxLength(200);
        task.Property(t => t.Description).HasMaxLength(2000);
        task.Property(t => t.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        task.Property(t => t.CreatedAt).IsRequired();
        task.Property(t => t.UpdatedAt).IsRequired();
        task.HasIndex(t => t.Status);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries<TaskItem>();
        var utcNow = DateTime.UtcNow;
        foreach (var e in entries)
        {
            if (e.State == EntityState.Modified)
            {
                e.Entity.UpdatedAt = utcNow;
            }
            else if (e.State == EntityState.Added)
            {
                e.Entity.CreatedAt = utcNow;
                e.Entity.UpdatedAt = utcNow;
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }
}
