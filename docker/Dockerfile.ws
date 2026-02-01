FROM oven/bun:1-alpine

WORKDIR /usr/src/app

ARG DATABASE_URL
COPY packages ./
COPY bun.lock ./

COPY package.json ./
COPY turbo.json ./

COPY apps/ws-backend ./

RUN bun install
RUN bun run db:generate
RUN DATABASE_URL=${DATABASE_URL} bun run build

COPY . .

RUN bun install

CMD [ "bun","run", "start:ws" ]