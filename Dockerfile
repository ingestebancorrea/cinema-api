FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY src ./src
COPY .env ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]