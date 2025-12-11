# Build stage
FROM node:22.21.1-alpine AS builder

WORKDIR /app

# Update Alpine packages to get latest security fixes
RUN apk update && apk upgrade --no-cache

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Accept build arguments
ARG VITE_API_URL
ARG VITE_MESSAGE_API_URL
ARG VITE_USE_MOCK_DATA
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_MESSAGE_API_URL=$VITE_MESSAGE_API_URL
ENV VITE_USE_MOCK_DATA=$VITE_USE_MOCK_DATA

# Build for production
RUN npm run build

# Production stage
FROM nginx:1.29-alpine3.23

# Update Alpine packages including libpng security fixes (CVE-2025-65018, CVE-2025-64720)
RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
