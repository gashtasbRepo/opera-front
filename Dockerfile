# Stage 1: Build the React App
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the Built App
FROM nginx:alpine

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the nginx configuration for serving the app
COPY nginx.conf /etc/nginx/conf.d

# Copy the built app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the server
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
