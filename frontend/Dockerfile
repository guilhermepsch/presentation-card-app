# ------------------------
# DEV
# ------------------------
FROM node:22 AS dev

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/. .

EXPOSE 4200

CMD ["npm", "run", "start"]
