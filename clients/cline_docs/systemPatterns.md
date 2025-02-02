# System Patterns

## How the System is Built

- **Monorepo**: Uses Turborepo to manage multiple apps and packages.
- **Frontend**: Next.js app in `apps/web`.
- **Backend**: Python-based REST API with workers.
- **Shared Resources**: `packages/ui` and `packages/sdk`.

## Key Technical Decisions

- Use of Docker for local development with PostgreSQL, Redis, and Minio.
- Python 3.12 and Node.js 18 as primary languages.
- Turborepo for monorepo management.

## Architecture Patterns

- **Backend**:
  - REST API serves as the main interface.
  - Workers handle asynchronous tasks.
- **Frontend**:
  - Next.js app for the web client.
  - Storybook for component design.
