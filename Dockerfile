
FROM node:alpine

WORKDIR /usr/src

COPY . .

EXPOSE 5000

RUN npm i

RUN npx prisma migrate deploy

RUN npx prisma db seed

RUN npm run build

CMD ["npm", "start"]