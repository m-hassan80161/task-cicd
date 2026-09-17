FROM node:24-slim


RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app



COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY src ./src

EXPOSE 3000

CMD ["npm", "start"]