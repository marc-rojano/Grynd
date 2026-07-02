# Use an official Node.js runtime as a parent image
# Use the 'slim' variant which is based on Debian (glibc) instead of Alpine (musl).
# This improves compatibility with native dependencies like the one used by Vite/Rolldown.
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# PASO 1: Copia los ficheros de definición de paquetes.
COPY package*.json ./

# PASO 2: Instala las dependencias.
# Esto crea la carpeta node_modules DENTRO de la imagen.
RUN npm install --legacy-peer-deps

# PASO 3: Copia el resto del código.
# Gracias al .dockerignore, esto NO copiará tu node_modules local.
COPY . .

# Make port 5173 available to the world outside this container
EXPOSE 5173

# Define the command to run the app
# Esto usará el código copiado y los node_modules instalados DENTRO del contenedor.
CMD ["npm", "run", "dev"]