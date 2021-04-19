FROM node:12.18.3-slim

LABEL maintainer="Jerry <jerry@freshworks.io>"

WORKDIR /app

COPY ./package.json .

RUN apt-get update && apt-get -y install procps

RUN npm install


COPY ./ .

EXPOSE 3000

CMD [ "npm", "run", "dev"]