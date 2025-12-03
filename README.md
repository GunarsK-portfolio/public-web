# Public Web

![CI](https://github.com/GunarsK-portfolio/public-web/workflows/CI/badge.svg)
[![CodeRabbit](https://img.shields.io/coderabbit/prs/github/GunarsK-portfolio/public-web?label=CodeRabbit&color=2ea44f)](https://coderabbit.ai)

Public-facing portfolio website built with Vue.js.

## Features

- Browse projects portfolio with detailed project pages
- View skills, experience, and certifications
- Miniatures gallery organized by themes
- Contact page with form
- Light/Dark theme toggle
- Responsive design with Naive UI
- Mock data support for development
- Error pages (404, 403)
- Smooth scroll navigation

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **UI Library**: Naive UI
- **HTTP Client**: Axios
- **Routing**: Vue Router
- **Theme Management**: Custom composable

## Prerequisites

- Node.js 22+ (LTS)
- npm 11+

## Project Structure

```text
public-web/
├── src/
│   ├── assets/           # Global styles
│   ├── components/       # Vue components
│   │   ├── home/         # Home page sections
│   │   └── shared/       # Reusable components
│   ├── composables/      # Reusable logic (theme, error handling)
│   ├── constants/        # Shared constants
│   ├── views/            # Page components
│   ├── errors/           # Error pages (404, 403)
│   ├── router/           # Route definitions
│   ├── services/         # API service layer
│   ├── mock/             # Mock data (JSON files)
│   ├── config/           # Configuration
│   ├── App.vue           # Root component
│   └── main.js           # Application entry
├── public/               # Public static files
└── index.html            # HTML template
```

## Quick Start

### Using Docker Compose

```bash
docker-compose up -d
```

### Local Development

1. Install dependencies:

```bash
npm install
```

1. Create `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:8082/api/v1
VITE_USE_MOCK_DATA=true

# HTTPS Configuration (optional)
VITE_CERT_DIR=../infrastructure/docker/traefik/certs
VITE_CERT_FILE=localhost.crt
VITE_KEY_FILE=localhost.key
```

1. Run development server:

```bash
npm run dev
```

1. Access at: `http://localhost:8080`

## Available Commands

Using Task:

```bash
# Development
task dev:start           # Start development server
task install             # Install dependencies

# Build
task build               # Build for production
task preview             # Preview production build
task clean               # Clean build artifacts

# Code quality
task lint                # Run ESLint
task lint:fix            # Run ESLint and auto-fix issues
task format              # Format code with Prettier
task format:check        # Check code formatting

# Security
task security:audit      # Run npm security audit (high/critical only)

# Docker
task docker:build        # Build Docker image
task docker:run          # Run in Docker container

# Testing
task test                # Run unit tests
task test:watch          # Run tests in watch mode
task test:coverage       # Run tests with coverage

# CI/CD
task ci:all              # Run all CI checks
```

## Testing

Unit tests use Vitest with Vue Test Utils. See [TESTING.md](TESTING.md) for details.

## Environment Variables

| Variable             | Description | Default       |
| -------------------- | ----------- | ------------- |
| `VITE_API_URL`       | API URL     | localhost     |
| `VITE_USE_MOCK_DATA` | Mock data   | true          |
| `VITE_CERT_DIR`      | Cert dir    | certs/        |
| `VITE_CERT_FILE`     | Cert file   | localhost.crt |
| `VITE_KEY_FILE`      | Key file    | localhost.key |

## Development Server

The development server runs on port 8080 and supports HTTPS if
certificates are available in `../infrastructure/docker/traefik/certs/`.

## Building for Production

```bash
task build
```

Output is in the `dist/` directory.

## Deployment

The app is containerized with nginx:

```dockerfile
# Build stage
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

## API Integration

The app supports both mock data (for development) and real API integration.

### Mock Data Mode (Development)

Set `VITE_USE_MOCK_DATA=true` to use local JSON files from `src/mock/`:

- Profile information
- Experience & certifications
- Skills with categories
- Projects with technologies
- Miniatures & themes
- Contact information

### Real API Mode (Production)

Set `VITE_USE_MOCK_DATA=false` to connect to the public-api service.

**Available Endpoints:**

- `GET /profile` - User profile
- `GET /experience` - Work experience
- `GET /certifications` - Certifications
- `GET /skills` - Skills list
- `GET /projects` - All projects
- `GET /projects/:id` - Project details
- `GET /miniatures` - All miniatures
- `GET /miniatures/:id` - Miniature details
- `GET /miniatures/themes` - Miniature themes with grouped items

API service configuration is in `src/services/api.js`.

## Theme System

The application supports light and dark themes with automatic persistence:

- **Theme Toggle**: Available in the header
- **Persistence**: Theme preference saved to localStorage
- **System Default**: Respects OS dark mode preference
- **No Flash**: Theme applied before page render
- **Composable**: `useTheme.js` for theme management

Themes are managed using Naive UI's built-in theme system with custom CSS variables.

## Styling

The application uses:

- **Naive UI components** for the user interface
- **Global styles** in `src/assets/styles.css` for layout and theming
- **Scoped styles** in components for component-specific styling
- **CSS variables** for consistent theming

## Component Architecture

### Home Page Sections

All home page sections are in `src/components/home/`:

- Load data using composables and API service
- Use `useErrorHandler` for error handling with retry
- Display loading states with spinners
- Use fade-up transitions for smooth appearance

### Shared Components

Reusable components in `src/components/shared/`:

- BackToTop button with scroll detection

### Error Handling

- Custom error handler composable (`useErrorHandler`)
- Retry functionality for failed API calls
- User-friendly error messages
- Dedicated error pages (404, 403)

## License

[MIT](LICENSE)
