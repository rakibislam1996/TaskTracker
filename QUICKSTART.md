# Quick Start Guide

## Running with Docker (Recommended)

From the root directory:

```bash
docker compose up --build
```

This will start:
- PostgreSQL database on port 5432
- .NET GraphQL API on port 8080
- React frontend on port 5173

## URLs

- Frontend: http://localhost:5173
- GraphQL API: http://localhost:8080/graphql
- GraphQL Playground: http://localhost:8080/graphql (in development)

## Development Mode

### Backend
```bash
cd backend/TaskTracker.Api
dotnet run
```

### Frontend
```bash
cd frontend
npm install
npm run relay  # Generate GraphQL types
npm run dev
```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL`: GraphQL API endpoint (default: http://localhost:8080/graphql)

### Backend
- `ConnectionStrings__Default`: PostgreSQL connection string