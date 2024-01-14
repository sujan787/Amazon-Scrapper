# Use an official Node.js runtime as a base image
FROM node:alpine3.18
WORKDIR /app/api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
