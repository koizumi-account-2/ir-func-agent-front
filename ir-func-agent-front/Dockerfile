# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build:test

# Nginx stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]