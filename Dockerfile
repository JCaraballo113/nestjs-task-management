FROM node:alpine

WORKDIR /app

COPY ./package.json .

RUN yarn install

COPY init_db.sql /docker-entrypoint-initdb.d/

COPY ./ ./



CMD ["yarn", "start:debug"]