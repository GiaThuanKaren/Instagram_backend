FROM node:17-alpine3.14

RUN npm i -g nodemon@2.0.7

WORKDIR /usr/src/app



COPY package*.json ./

RUN npm install

RUN npx prisma init

RUN ["npx", "prisma"", generate"]

COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]