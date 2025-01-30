FROM node:18

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./
RUN yarn install

COPY . .

CMD ["yarn", "run", "dev"]