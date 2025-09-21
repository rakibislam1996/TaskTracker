# Task Tracker with GraphQL, .NET 9, PostgreSQL, React (Relay + Spectrum)

## Overview
A simple full-stack task tracker showcasing:
- .NET 9 + Hot Chocolate GraphQL
- Entity Framework Core + PostgreSQL
- React + Relay + Adobe React Spectrum UI
- Docker Compose orchestration
- AI-assisted development (ChatGPT / Copilot)

## Backend
GraphQL endpoint: `/graphql`
Schema (core types):
```
TaskItem { id, title, description, status, createdAt, updatedAt }
Query { getAllTasks }
Mutation { createTask, updateTaskStatus }
```

## Frontend
Relay environment connects to the API. Features:
- Create task form
- Task list table
- Toggle status (Pending / Completed)

## Running (Development)
1. Ensure Docker installed.
2. Run: `docker compose up --build` (or `docker-compose` depending on version)
3. Frontend: http://localhost:5173
4. API: http://localhost:8080/graphql
5. Postgres: localhost:5432 (user: taskuser / pass: taskpass / db: tasktracker)

## Local (without Docker)
- Start Postgres locally and update `appsettings.Development.json` connection string.
- Run backend: `dotnet run --project TaskTracker.Api` (serves on http://localhost:5000 or configured port)
- Install frontend deps: `cd frontend && npm install && npm run dev`

## Relay Artifacts
After changing GraphQL operations or schema: `npm run relay` inside `frontend`.

## AI Assistance Notes
Used AI to:
- Scaffold GraphQL schema and mutations
- Generate EF Core models and context
- Create Docker configurations
- Scaffold React + Relay + Spectrum components

Manual refinements:
- Ensured proper enum handling (TaskStatus) avoiding ambiguity
- Added seeding and auto-migration for smoother bootstrap
- Simplified schema to match assignment (removed paging/filters)

## Future Enhancements
- Add filtering/paging
- Add optimistic updates in Relay
- Add authentication
- Add tests (unit/integration)

## Health
`/health` endpoint for basic liveness.
