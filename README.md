# Portfolio Public Web

Public-facing Vue.js portfolio website that displays professional information and miniature painting projects.

## Features

- Responsive design with Tailwind CSS + DaisyUI
- Vue.js 3 Composition API
- Pinia for state management
- Vue Router for navigation
- Fetches data from Public API
- Production-ready Nginx setup

## Tech Stack

- **Framework**: Vue.js 3
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State**: Pinia
- **Router**: Vue Router
- **HTTP Client**: Axios
- **Server**: Nginx (production)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env if needed (defaults should work)

# Start dev server
npm run dev

# Open browser to http://localhost:5173
```

### Environment Variables

The `.env` file contains:

```bash
# For standalone development
VITE_API_URL=http://localhost:8082

# When running via docker-compose infrastructure (recommended)
VITE_API_URL=http://localhost/api/v1
```

Vite automatically loads environment variables from `.env` files.

## Project Structure

```
public-web/
├── public/               # Static assets
├── src/
│   ├── assets/
│   │   └── style.css    # Tailwind styles
│   ├── components/      # Reusable components
│   ├── views/           # Page components
│   │   ├── Home.vue
│   │   ├── Experience.vue
│   │   ├── Miniatures.vue
│   │   └── MiniatureDetail.vue
│   ├── router/
│   │   └── index.js     # Route definitions
│   ├── services/
│   │   └── api.js       # API client
│   ├── App.vue
│   └── main.js
├── Dockerfile
├── nginx.conf
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Pages

- **Home** (`/`) - Profile information and navigation cards
- **Experience** (`/experience`) - Work experience and certifications
- **Miniatures** (`/miniatures`) - Gallery of miniature painting projects
- **Miniature Detail** (`/miniatures/:id`) - Detailed view with images

## Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker

### Build Image

```bash
docker build -t public-web .
```

### Run Container

```bash
# Standalone mode
docker run -p 8080:80 -e VITE_API_URL=http://localhost:8082 public-web

# With Traefik reverse proxy (see infrastructure repo)
docker run -p 8080:80 -e VITE_API_URL=http://localhost/api/v1 public-web
```

**Note:** For production deployment, use the centralized docker-compose setup in the [infrastructure repository](https://github.com/GunarsK-portfolio/infrastructure) which includes Traefik reverse proxy.

### Docker Compose (Standalone)

For standalone testing without Traefik:

```yaml
version: '3.8'

services:
  public-web:
    build: .
    ports:
      - "8080:80"
    environment:
      - VITE_API_URL=http://localhost:8082
    depends_on:
      - public-api
```

## Customization

### Themes

DaisyUI themes can be changed in `tailwind.config.js`:

```js
daisyui: {
  themes: ["light", "dark", "cupcake", "bumblebee"],
}
```

### Colors and Styles

Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

## API Integration

The app connects to the Public API to fetch:
- Profile information
- Work experience
- Certifications
- Miniature projects and images

API client is configured in `src/services/api.js`.

## Deployment

### Production Checklist

1. Set `VITE_API_URL` to your production API URL
2. Build the app: `npm run build`
3. Deploy `dist/` folder to:
   - Nginx server
   - AWS S3 + CloudFront
   - Vercel/Netlify
   - Docker container

### Nginx Deployment

```bash
# Copy built files to nginx
cp -r dist/* /var/www/html/

# Or use the Docker image
docker run -p 80:80 public-web
```

## Troubleshooting

### API Connection Issues

Check that `VITE_API_URL` is set correctly and the API is running:

```bash
# Standalone mode
curl http://localhost:8082/api/v1/health

# Via Traefik (infrastructure setup)
curl http://localhost/api/v1/profile
```

### Build Fails

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Related Repositories

- [infrastructure](https://github.com/GunarsK-portfolio/infrastructure)
- [public-api](https://github.com/GunarsK-portfolio/public-api)
- [admin-web](https://github.com/GunarsK-portfolio/admin-web)

## License

MIT
