# Serviço de Screenshot

Este é um microserviço Node.js que utiliza Express e Playwright para capturar screenshots de páginas web.

## Funcionalidade

O serviço expõe um único endpoint GET `/screenshot`:

- **Endpoint:** `/screenshot`
- **Método:** `GET`
- **Parâmetro de Query:** `url` (obrigatório) - A URL da página da qual capturar a screenshot.

**Exemplo de Uso:**

```
GET http://localhost:3000/screenshot?url=https://google.com
```

O serviço navega até a URL fornecida usando um navegador Chromium headless (via Playwright), tira uma screenshot da página inteira e retorna a imagem como um arquivo PNG.

## Requisitos

- Docker
- Docker Compose

## Como Executar

1.  **Construa a imagem Docker:**
    Execute o seguinte comando na raiz do projeto (onde o `Dockerfile` e `docker-compose.yml` estão localizados):
    ```bash
    docker compose build
    ```

2.  **Inicie o serviço:**
    ```bash
    docker compose up
    ```
    O serviço estará rodando em `http://localhost:3000`.

## Endpoint

### `GET /screenshot`

Captura uma screenshot da URL fornecida.

**Parâmetros:**

- `url` (string, obrigatório): A URL completa (incluindo `http://` ou `https://`) da página a ser capturada.

**Respostas:**

- **`200 OK`**: Retorna a imagem da screenshot em formato PNG com o cabeçalho `Content-Type: image/png`.
- **`400 Bad Request`**: Se o parâmetro `url` estiver ausente ou for inválido.
- **`500 Internal Server Error`**: Se ocorrer um erro inesperado durante o processo de captura.
- **`504 Gateway Timeout`**: Se a navegação para a URL exceder o tempo limite (timeout).