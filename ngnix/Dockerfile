FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*
ADD nginx.conf /etc/nginx/conf.d/
ADD index.html /usr/share/nginx/html/
