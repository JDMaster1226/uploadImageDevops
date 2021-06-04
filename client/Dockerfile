FROM node:16.2-alpine3.11

RUN apk add git

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

CMD ["npm", "run", "start"]
