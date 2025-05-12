# Store Web App

Next.js web application for the Little Fish Pet Store.

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Development

- The app uses Next.js with TypeScript
- Edit `app/page.tsx` to modify the main page
- Uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for font optimization

## Testing

Tests are written using Jest and React Testing Library. Each component has its test file located next to it with the `.test.tsx` extension.

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```
