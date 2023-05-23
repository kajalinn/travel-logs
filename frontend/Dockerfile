# Stage 1: Build Angular app
FROM node:18.10.0 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2: Serve Angular app with NGINX
FROM nginx:alpine

COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Replace the default NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
