# Build App
FROM node:alpine as build

WORKDIR /app

COPY . .
RUN npm run build

# Deploy App to NGINX
FROM nginx:alpine

COPY --from=build /app/dist /var/www

## Replace the default nginx config
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]
