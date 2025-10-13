# Public Web

Public-facing portfolio website built with Vue.js.

## Features

- Browse projects portfolio
- View skills and experience
- Responsive design with Naive UI
- Modern Vue 3 UI components
- State management with Pinia
- Vue Router for navigation

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **UI Library**: Naive UI
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Routing**: Vue Router

## Prerequisites

- Node.js 18+
- npm or yarn

## Project Structure

```
public-web/
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable components
│   ├── views/            # Page components
│   ├── router/           # Route definitions
│   ├── stores/           # Pinia stores
│   ├── services/         # API service layer
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

2. Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:8082/api/v1
```

3. Run development server:
```bash
npm run dev
```

4. Access at: `http://localhost:8080`

## Available Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Public API base URL | `https://localhost/api/v1` |
| `VITE_CERT_DIR` | Certificate directory for HTTPS dev server | `../infrastructure/docker/traefik/certs` |
| `VITE_CERT_FILE` | Certificate filename | `localhost.crt` |
| `VITE_KEY_FILE` | Private key filename | `localhost.key` |

## Development Server

The development server runs on port 8080 and supports HTTPS if certificates are available in `../infrastructure/docker/traefik/certs/`.

## Building for Production

```bash
npm run build
```

Output is in the `dist/` directory.

## Deployment

The app is containerized with nginx:

```dockerfile
# Build stage
FROM node:18-alpine as build
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

The app connects to the public-api service for portfolio data:
- Projects
- Skills
- Experience
- About information

API service configuration is in `src/services/api.js`.

## Styling

The application uses Naive UI components for the user interface.

## License

MIT
