FROM node:18-alpine

RUN apk add --no-cache bash curl \
  && npm install -g pnpm @nestjs/cli

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["sh", "-c", "npx knex migrate:latest && node dist/main.js"]