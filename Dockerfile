# Build App
FROM node:alpine as build

WORKDIR /app

ENV API_URL=http://localhost:5000/api

COPY . .

RUN npm install

RUN npm run build

# Deploy App to NGINX
FROM nginx:alpine

COPY --from=build /app/dist /var/www

## Replace the default nginx config
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]
