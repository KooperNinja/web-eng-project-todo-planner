FROM node:18

WORKDIR /app

RUN npm install -g nodemon
RUN npm install -g prisma

COPY package*.json ./

COPY . .

RUN yarn install
RUN yarn run db:deploy

CMD ["yarn", "run", "dev"]