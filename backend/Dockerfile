# Use an official Node.js runtime as a parent image
# Use the 'slim' variant which is based on Debian (glibc) instead of Alpine (musl).
# This improves compatibility with potential native dependencies.
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# Copia ambos package.json y package-lock.json para asegurar una instalación determinista
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "dev"]