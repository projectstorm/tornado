FROM node:19-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json tsconfig.base.json ./

COPY tornado-common /app/tornado-common/
COPY tornado-frontend /app/tornado-frontend/
COPY tornado-server /app/tornado-server/

RUN pnpm install && cd /app/tornado-server && pnpm primsa:gen
RUN pnpm build:prod

CMD node tordnado-server/dist/index.js