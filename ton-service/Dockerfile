FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npx ng build --configuration production --source-map=false

FROM nginx

COPY --from=build ./app/dist/ton-service ./usr/share/nginx/html
