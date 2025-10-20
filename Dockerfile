# ✅ Use a reliable and lightweight Node base (Debian 12 Bookworm)
FROM node:18-bookworm-slim

# Set working directory
WORKDIR /app

# ✅ Install required tools and dependencies safely
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    imagemagick \
    webp \
    git \
    curl \
    ca-certificates \
    tzdata \
    procps \
    tini && \
    rm -rf /var/lib/apt/lists/*

# ✅ Install PM2 globally (for process management)
RUN npm install -g pm2

# Copy package files first (for caching)
COPY package*.json ./

# ✅ Install production dependencies only (faster + smaller)
RUN npm install --omit=dev --legacy-peer-deps

# Copy app files
COPY . .

# ✅ Create session folder
RUN mkdir -p /app/session

# ✅ Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# ✅ Use tini as entrypoint to handle PID 1 signals properly (Heroku & Docker friendly)
ENTRYPOINT ["/usr/bin/tini", "--"]

# ✅ Expose Heroku’s runtime port
EXPOSE 3000

# ✅ Start app using PM2 (keeps it alive & restarts on crash)
CMD ["pm2-runtime", "start", "control.js", "--name", "makamesco-md"]
