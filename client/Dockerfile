FROM node:16.2-alpine3.11

ARG NAMESER

RUN apk add git

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .



CMD NAMESER=$NAMESER npm start
