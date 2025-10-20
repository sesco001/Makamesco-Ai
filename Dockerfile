# Use the latest stable Node LTS image (Debian 12 - Bookworm)
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install required system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    imagemagick \
    webp \
    git \
    curl && \
    rm -rf /var/lib/apt/lists/*

# Install PM2 globally
RUN npm install -g pm2

# Copy package files for dependency installation
COPY package*.json ./

# Install app dependencies (clean install)
RUN npm ci --omit=dev

# Copy the rest of the app files
COPY . .

# Ensure session folder exists
RUN mkdir -p /app/session

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose app port
EXPOSE 3000

# Start the app with PM2
CMD ["pm2-runtime", "start", "control.js"]
