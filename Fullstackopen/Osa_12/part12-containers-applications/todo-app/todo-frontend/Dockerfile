FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]

FROM build-stage AS test

ENV CI=true

RUN npm run test

CMD ["npm", "start"]


