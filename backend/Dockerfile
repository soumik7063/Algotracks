# Use Node LTS
FROM node:22.14.0

# Set working directory inside container
WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Install dependencies (use --production if deploying)
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 3000

# Use environment variables from docker-compose or .env
# (no need to copy .env unless you want it inside image)
# ENV NODE_ENV=production

# Start the backend server
CMD ["npm", "start"]
