# Etapa 1: Build
FROM node:22.14.0-slim AS builder

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY . .
RUN npm install -g npm@11.2.0
RUN npm install

# Generar Prisma Client y compilar NestJS
RUN npx prisma generate
RUN npm run build

# Etapa 2: Producción
FROM node:22.14.0-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copiar build y Prisma Client generado
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma  

EXPOSE 3000

#CMD ["node", "dist/src/main.js"]
CMD npx prisma migrate deploy && node dist/src/main.js

