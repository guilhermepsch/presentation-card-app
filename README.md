# PurpleCards

PurpleCards é uma aplicação simples de cartões de apresentação, com backend e frontend rodando em contêineres Docker.

---

## Requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Como começar

Siga estes passos para configurar o projeto localmente:

### 1. Clonar o repositório

```bash
git clone https://github.com/guilhermepsch/presentation-card-app.git
cd presentation-card-app
```

### 2. Configurar variáveis de ambiente

- Vá até o diretório **backend** e crie um arquivo `.env` baseado no `.env.sample`:

```bash
cd backend
cp .env.sample .env
```

- Vá até o diretório **frontend** e crie um arquivo `.env` baseado no `.env.sample`:

```bash
cd ../frontend
cp .env.sample .env
```

### 3. Rodar o projeto com Docker Compose

Na raiz do projeto, execute:

```bash
docker compose up
```

Isso irá iniciar os serviços de backend e frontend.

### 4. Rodar as migrações do banco de dados

Em outro terminal, execute:

```bash
docker exec -it presentation-backend-dev npx mikro-orm migration:up --config ./src/config/mikro-orm.config.ts
```

---

## Acessando a aplicação

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend: [http://localhost:3000](http://localhost:3000)

---

## Comandos úteis

- **Parar os contêineres**
  ```bash
  docker compose down
  ```

- **Parar e remover volumes** (recomeçar do zero)
  ```bash
  docker compose down -v
  ```

- **Rebuild dos contêineres**
  ```bash
  docker compose up --build
  ```

---
