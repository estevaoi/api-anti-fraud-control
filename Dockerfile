FROM node:10-alpine

WORKDIR /usr/app

COPY ./src/package*.json ./
RUN npm install

COPY . .

EXPOSE 7070

CMD [ "npm", "start" ]