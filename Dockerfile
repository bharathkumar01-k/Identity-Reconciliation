FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
CMD [ "node","bin/index.js" ]