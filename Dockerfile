FROM node:18

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server (ensure static files are served)
CMD ["node", "build"]
