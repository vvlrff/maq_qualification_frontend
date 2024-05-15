FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=8192 npm run build

FROM nginx:stable-alpine as nginx

RUN apk add --no-cache --virtual .build-deps \
    git \
    gcc \
    libc-dev \
    make \
    openssl-dev \
    pcre-dev \
    zlib-dev \
    linux-headers \
    curl \
    gnupg \
    libxslt-dev \
    gd-dev \
    geoip-dev \
    perl-dev

RUN curl -fSL https://nginx.org/download/nginx-1.21.0.tar.gz -o nginx.tar.gz \
    && tar -zxvf nginx.tar.gz \
    && rm nginx.tar.gz \
    && cd nginx-1.21.0 \
    && git clone https://github.com/vozlt/nginx-module-vts.git \
    && ./configure --with-compat --add-dynamic-module=./nginx-module-vts \
    && make modules \
    && cp objs/ngx_http_vhost_traffic_status_module.so /etc/nginx/modules \
    && cd .. \
    && rm -rf nginx-1.21.0

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]