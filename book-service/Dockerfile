# Use a Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the service port
EXPOSE 50052

# Command to run the service
CMD ["npm", "run", "start:prod"]
