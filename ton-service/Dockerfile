FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build:ssr:docker

FROM node:20-alpine AS run

WORKDIR /app

COPY --from=build /app/dist/ton-service ./dist/ton-service

ENV NODE_ENV=production
ENV PORT=80
ENV API_URL=http://be:1739

EXPOSE 80

CMD ["node", "dist/ton-service/server/main.js"]
