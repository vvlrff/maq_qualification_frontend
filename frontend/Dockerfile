FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=8192 npm run build

FROM nginx:stable-alpine

# Установка модуля vts
RUN apt-get update && apt-get install -y wget gnupg
RUN wget https://nginx.org/keys/nginx_signing.key && apt-key add nginx_signing.key  
RUN echo "deb http://nginx.org/packages/mainline/debian/ bullseye nginx" >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y nginx-module-vts

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443 
EXPOSE 9913

CMD ["nginx", "-g", "daemon off;"]