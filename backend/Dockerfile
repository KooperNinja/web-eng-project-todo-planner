FROM node:18

WORKDIR /app

RUN npm install -g nodemon
RUN npm install -g prisma

COPY package*.json ./

CMD ["yarn", "install"]