FROM node:16 AS build-stage

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL=http://localhost:3001/

COPY . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]

FROM build-stage AS test

ENV CI=true

RUN npm run test


