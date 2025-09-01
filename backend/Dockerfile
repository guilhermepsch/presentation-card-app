# ------------------------
# DEV
# ------------------------
FROM node:22 AS dev

WORKDIR /app/backend

RUN npm install -g @nestjs/cli

COPY backend/package*.json ./
RUN npm install

CMD ["npm", "run", "start:dev"]