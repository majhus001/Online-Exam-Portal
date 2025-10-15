# Stage 1: Build the React application
# Use a specific Node.js version for reproducibility
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Use 'npm ci' for faster, more reliable builds from package-lock.json
# This installs all dependencies, including devDependencies needed for the build
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Create the production build
RUN npm run build

# ---

# Stage 2: Serve the application with a secure Nginx
# Use the stable-alpine base image
FROM nginx:stable-alpine

# Update the package index and specifically upgrade libxml2 to the fixed version.
# Then, clean up the apk cache to keep the final image small.
RUN apk update && \
    apk upgrade --no-cache libxml2 && \
    rm -rf /var/cache/apk/*

# Copy the static build files from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 on the container
EXPOSE 80

# Start Nginx in the foreground when the container launches
CMD ["nginx", "-g", "daemon off;"]
