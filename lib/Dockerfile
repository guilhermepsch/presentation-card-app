# ------------------------
# DEV
# ------------------------
FROM node:22 AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose a volume with the compiled output
VOLUME /app/dist

# Watch TypeScript changes and compile
CMD ["npm", "run", "dev"]
