# Use Node LTS version
FROM node:22.14.0

# Set working directory inside container
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose Vite default port
EXPOSE 5173

# Run Vite development server (with host 0.0.0.0 for Docker)
CMD ["npm", "run", "dev", "--", "--host"]
