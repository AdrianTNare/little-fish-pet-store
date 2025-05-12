# Little Fish Pet Store Monorepo

This monorepo contains the applications for the Little Fish Pet Store project.

## Prerequisites

- Node.js (latest LTS version recommended)
- pnpm (package manager)

## Project Structure

```
apps/
  ├── store-web-app/     # Next.js web application
  └── [other apps...]    # Other applications in the monorepo
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Run the web application:
```bash
# From root directory
pnpm --filter store-web-app dev

# Or cd into the app directory
cd apps/store-web-app
pnpm dev
```

The web app will be available at [http://localhost:3000](http://localhost:3000)

## Running Tests

You can run tests for all applications or for specific apps:

```bash
# Run all tests across all apps
pnpm test

# Run tests for a specific app
pnpm --filter store-web-app test

# Run tests in watch mode for a specific app
pnpm --filter store-web-app test:watch

# Run tests with coverage for a specific app
pnpm --filter store-web-app test:coverage
```

## Development

Each application in the monorepo has its own README with more specific instructions. See:
- [Store Web App](./apps/store-web-app/README.md)
