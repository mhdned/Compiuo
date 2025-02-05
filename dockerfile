FROM node

WORKDIR /app

COPY package.json /app/

COPY . /app

RUN npm install

RUN npx prisma generate

EXPOSE 8000

CMD [ "npm", "run", "start:dev" ]
