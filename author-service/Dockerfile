# Use a Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json pnpm-lock.yaml ./

# Install deps with pnpm
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build the NestJS project
RUN pnpm build

# Expose the service port
EXPOSE 50051

# Command to run the service
CMD ["pnpm", "start:prod"]
