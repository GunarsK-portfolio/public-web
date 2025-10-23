# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Update Alpine packages and explicitly upgrade pcre2 to fix CVE-2025-58050
RUN apk update && apk add --upgrade pcre2 --no-cache

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Accept build arguments
ARG VITE_API_URL
ARG VITE_USE_MOCK_DATA
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_USE_MOCK_DATA=$VITE_USE_MOCK_DATA

# Build for production
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
