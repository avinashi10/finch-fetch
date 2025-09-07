# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Run Next.js in production
EXPOSE 3000
ENV PORT=3000 NODE_ENV=production
CMD ["npm", "start"]
