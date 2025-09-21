# Task Tracker (GraphQL, .NET 9, PostgreSQL, React + Relay + Adobe Spectrum)

## 1. Overview
A minimal task tracking application demonstrating a full-stack implementation plus deliberate AI-assisted development workflow (ChatGPT / GitHub Copilot). Built to satisfy the interview assignment requirements.

## 2. Tech Stack
- Backend: .NET 9, ASP.NET Core Minimal Hosting, Hot Chocolate GraphQL, EF Core, PostgreSQL
- Frontend: React 18, Relay, Adobe React Spectrum, Vite, TypeScript
- Infra: Docker & Docker Compose

## 2a. Approach & Thought Process
Goal: deliver a minimal, clean, fully working stack within the assignment scope (2–3 hours target) while showing effective AI leverage.
Steps Taken:
1. Clarified schema & operations (Task entity + required mutations/query).
2. Scaffolded backend project; added EF Core, Npgsql, Hot Chocolate.
3. Implemented entity, DbContext, migrations, automatic migration + seed.
4. Added GraphQL query & mutations; validated build.
5. Added Docker (API + Postgres) early to ensure env consistency.
6. Iterated on GraphQL (removed non-required paging/filtering to stay minimal).
7. Scaffolded frontend with Relay + Spectrum (query, create form, toggle status).
8. Ensured environment wiring (VITE_API_URL) & compose integration.
9. Consolidated documentation; added AI usage reflections.
10. Final polish: README completeness, seeding, health endpoint.
Guiding Principles:
- Meet every bullet exactly—avoid scope creep.
- Keep code clear & interview-readable (minimal abstractions, no premature patterns).
- Use AI for boilerplate; apply human review for correctness & alignment.

## 3. Features Implemented
Backend:
- GraphQL Schema: `TaskItem` with `id`, `title`, `description`, `status`, plus audit fields (`createdAt`, `updatedAt`).
- Query: `getAllTasks` (returns list of tasks ordered newest first).
- Mutations: `createTask(title, description)` and `updateTaskStatus(id, status)`.
- Persistence: EF Core + PostgreSQL with migration + automatic apply + seeding sample tasks.
- Health: `/health` endpoint.

Frontend:
- Add task form (Relay mutation -> refresh strategy via refetch key).
- Task list table (Spectrum `TableView`).
- Status toggle button (Relay mutation) switching `Pending` <-> `Completed`.
- Relay environment with configurable API URL via `VITE_API_URL`.

Docker:
- Backend multi-stage Dockerfile.
- Frontend build + Nginx static hosting Dockerfile.
- PostgreSQL service via official `postgres:16-alpine` image.
- `docker-compose.yml` orchestrates database, API, frontend.

## 4. Project Structure
```
backend/
  TaskTracker.Api/
    Program.cs
    Models/
    Data/
    GraphQL/
    Migrations/
frontend/
  package.json
  relay.config.js
  schema.graphql (placeholder – can regenerate via introspection)
  src/
    components/
    graphql/
    relay/
    App.tsx
Dockerfile(s)
README.md
```

## 5. Running the Stack
### With Docker
From `backend` directory (where compose file currently resides):
```
cd backend
docker compose up --build
```
Services:
- API: http://localhost:8080/graphql
- Frontend: http://localhost:5173
- Postgres: localhost:5432 (taskuser / TaskPass123)

### Local Dev (No Docker)
Backend:
```
cd backend/TaskTracker.Api
dotnet run
```
Frontend:
```
cd frontend
npm install
npm run relay   # re-run if GraphQL changes
npm run dev
```
Optional: create `.env` with `VITE_API_URL=http://localhost:8080/graphql`.

## 6. GraphQL Schema (Core)
```
type TaskItem {
  id: UUID!
  title: String!
  description: String
  status: TaskStatus!
  createdAt: DateTime
  updatedAt: DateTime
}

enum TaskStatus { Pending Completed }

type Query { getAllTasks: [TaskItem!]! }

type Mutation {
  createTask(title: String!, description: String): TaskItem!
  updateTaskStatus(id: UUID!, status: TaskStatus!): TaskItem!
}
```

## 7. AI Tools & Models Used
- GitHub Copilot (inline, model unspecified by platform) for: C# boilerplate (DbContext, entity), React components, Dockerfile drafts.
- ChatGPT (GPT-4 class) for: architectural planning, ambiguity resolution (enum name conflict), README drafting, step-by-step refinement.
Rationale for Use:
- Accelerate non-critical boilerplate creation.
- Validate approach quickly (schema + mutation shapes).
- Reduce context switching (generate Docker + Relay config faster).
Safeguards:
- Manual inspection of every generated file.
- Adjusted code to remove unnecessary complexity (filters/paging removed) to align tight spec.

## 8. Effectiveness Reflection
What Worked Well:
- Fast scaffolding of GraphQL + EF integration.
- Rapid iteration on UI components (form & table) via AI suggestions.
- Docker configuration produced with minimal manual tweaks.
What Required Manual Fixes:
- Enum name clash (`TaskStatus`) with BCL; resolved via alias/namespace control.
- Connection string / credentials ordering for migrations.
- Folder duplication cleanup and compose path correctness.
What Didn’t Add Value / Avoided:
- Over-engineered repository/service layers (unnecessary for assignment scale).
- Adding paging/filtering prematurely.
- Introducing extra libraries (validation/auth) outside scope.
How AI Helped Problem Solving:
- Provided quick diff-style edits for Program.cs evolution.
- Suggested consistent patterns for mutations minimizing logic errors.
- Assisted in articulating structured README sections.

## 9. Possible Enhancements (Future)
- Pagination & filtering (Hot Chocolate middleware).
- FluentValidation + custom error mapping.
- Optimistic UI updates & Relay store updater functions.
- Authentication / authorization.
- Automated integration tests (Testcontainers + WebApplicationFactory).
- Logging & observability (Serilog + OpenTelemetry).

## 10. Troubleshooting
- Empty task list: ensure API is healthy (`/health`) and CORS open.
- Migration errors: confirm Postgres container healthy; compose uses healthcheck.
- Relay compilation: update `schema.graphql` via introspection then run `npm run relay`.

## 11. Dev Credentials
- User: taskuser
- Password: TaskPass123
- Database: tasktrackerdb

## 12. Submission Checklist
- [x] Backend source
- [x] Frontend source
- [x] Dockerfiles + docker-compose
- [x] README (approach, AI tools, reflection)

## 13. Time & Scope Notes
Focused on required deliverables with light quality improvements (auditing fields, seeding) while excluding non-essential features.

---
End of README.