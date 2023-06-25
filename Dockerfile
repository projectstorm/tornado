FROM node:19-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json tsconfig.base.json ./

COPY tornado-common/package.json /app/tornado-common/
COPY tornado-frontend/package.json /app/tornado-frontend/
COPY tornado-server/package.json /app/tornado-server/
COPY tornado-server/prisma /app/tornado-server/prisma

RUN pnpm install

COPY tornado-common /app/tornado-common/
COPY tornado-frontend /app/tornado-frontend/
COPY tornado-server /app/tornado-server/

RUN pnpm build:prod

CMD node tornado-server/dist/index.js