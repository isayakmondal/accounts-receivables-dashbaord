# Use lightweight Node image
FROM node:16-alpine
 
# Set working directory inside container
WORKDIR /usr/src/app
 
# Copy dependency files first (for caching)
COPY package*.json ./
 
# Install dependencies (handle peer dependency issues)
RUN npm install --legacy-peer-deps
 
# Copy remaining project files
COPY . .
 
# Expose React port
EXPOSE 3000
 
# Start React app
CMD ["npm", "start"]
