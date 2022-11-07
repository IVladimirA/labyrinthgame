FROM node:16-alpine

ARG MONGODB_URI
ARG PORT

ENV MONGODB_URI=$MONGODB_URI
ENV PORT=$PORT

WORKDIR /home/app

COPY package*.json ./

RUN npm i

COPY . .

run npm run build

EXPOSE 3000

ENTRYPOINT ["node", "./build/index.js"]
