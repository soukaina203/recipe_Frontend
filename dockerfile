FROM node:18.20.0-alpine3.19 AS build-env
WORKDIR /app

# copy and cahe
COPY package*.json ./

RUN npm install --legacy-peer-deps --force

COPY src src
COPY .editorconfig .
COPY angular.json .
# COPY server.ts .
COPY transloco.config.js .
COPY tailwind.config.js .
COPY tsconfig*.json ./

RUN npm run prod
# RUN ls -al

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY ./ngx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-env /app/dist .
# COPY ./dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
