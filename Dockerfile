FROM node:14

WORKDIR /app

RUN npm i -g pm2

COPY package*.json ./
RUN npm ci

COPY ./ ./
RUN npm run build

EXPOSE 3005

RUN npm start