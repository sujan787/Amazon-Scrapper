
# # Stage 1: Build Express API
FROM node:alpine3.18 as build
WORKDIR /app/api
COPY api/package*.json ./
RUN npm install
COPY api/ .
RUN npm run build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
