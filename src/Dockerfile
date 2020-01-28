FROM node:10-alpine

WORKDIR /usr/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7070
CMD ["npm", "start"]