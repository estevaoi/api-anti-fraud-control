FROM node:10-alpine

WORKDIR /home/node/app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 7070
CMD [ "node", "server.js" ]