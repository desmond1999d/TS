FROM node:20-alpine AS build

ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN ls
RUN npx ng build --source-map=false

FROM nginx

COPY --from=build ./app/dist/ton-service ./usr/share/nginx/html
