# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install all dependencies (including devDependencies if needed for build steps)
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
# Copy other necessary folders if you have them (e.g., config, public)
COPY --from=builder /app/package.json ./

# Expose the port your app runs on (update if you use a different port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]