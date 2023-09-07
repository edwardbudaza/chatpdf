# Use the official Node.js image as a base
FROM node:18


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app files to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 (the default Next.js port)
EXPOSE 3000

# Start the Next.js app
CMD [ "npm", "start" ]