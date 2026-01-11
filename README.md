# Běžci sobě - React Application

A modern carpooling platform for runners built with React, TypeScript, and Vite.

## Security Features

This project is configured with security best practices:

- **`.npmrc`**: Configured to ignore post-install scripts (`ignore-scripts=true`)
- **Exact versions**: Dependencies use exact versions to prevent unexpected updates
- **Audit enabled**: Automatic security audits on package installation
- **Source maps disabled**: Production builds don't expose source code

## Installation

```bash
# Install dependencies with security settings
npm install

# Or use clean install with lockfile
npm ci
```

## Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run e2e tests
npm run e2e

# Build for production
npm run build
```

## Security Notes

- Always review `package-lock.json` changes before committing
- Run `npm audit` regularly to check for vulnerabilities
- Use `npm audit fix` to automatically fix issues when safe
- Never ignore security warnings without investigation

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components (views)
├── contexts/        # React Context for state management
├── services/        # API and data services
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
└── test/            # Test utilities and setup
```

## Technologies

- React 18 with TypeScript
- Vite for fast development
- React Router for navigation
- Bootstrap & Tailwind CSS for styling
- Vitest for unit testing
- Cypress for e2e testing
- LocalStorage for data persistence
