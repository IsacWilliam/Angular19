# PasseioApp 🗺️

O **PasseioApp** é uma aplicação web desenvolvida em Angular para gerenciamento e visualização de lugares turísticos e passeios. O projeto utiliza o `json-server` como um ecossistema de API REST simulada, contando com ambientes independentes para desenvolvimento local e testes de produção.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** Angular 19+, TailwindCSS, RxJS, SCSS
* **Backend Simulado:** JSON Server (REST API local)
* **Ferramentas de Build:** Vite / Esbuild (padrão do Angular Application Builder)

---

## ⚙️ Arquitetura de Ambientes e Proxy

Para evitar problemas de **CORS (Cross-Origin Resource Sharing)** e simular um ambiente real onde o Frontend e o Backend residem sob o mesmo domínio, o projeto utiliza um **Proxy de Desenvolvimento** do Angular.

As requisições feitas para `/api/*` são interceptadas e redirecionadas dinamicamente para a porta correta do banco de dados ativo:
* **Ambiente de Desenvolvimento:** Aponta para a porta `3000` (Base: `db.json`)
* **Ambiente de Produção (Local):** Aponta para a porta `4000` (Base: `db.production.json`)

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.

### 1. Instalar as dependências
Na raiz do projeto, execute:
```bash
npm install
```

### 2. Rodar no Ambiente de Desenvolvimento (Porta 3000)
Para rodar o projeto utilizando a base de dados padrão de desenvolvimento:

* **Passo 1 (Iniciar a API):** Em um terminal, execute:
  ```bash
  npm run server
  ```
* **Passo 2 (Iniciar o Angular):** Em outro terminal, execute:
  ```bash
  npm start
  ```
> A aplicação estará disponível em: `http://localhost:4200`

### 3. Rodar no Ambiente de "Produção" (Porta 4000)
Para simular o comportamento e carregar os dados da base de produção local:

* **Passo 1 (Iniciar a API de Produção):** Em um terminal, execute:
  ```bash
  npm run server:production
  ```
* **Passo 2 (Iniciar o Angular com o Proxy de Produção):** Em outro terminal, limpe o cache e suba o app:
  ```bash
  ng cache clean && npm run start:prod
  ```
> A aplicação lerá os dados contidos no arquivo `api/db.production.json`.

---

## 📦 Scripts Disponíveis no `package.json`

| Comando | Descrição |
| :--- | :--- |
| `npm start` | Inicia o servidor Angular integrado ao proxy de Desenvolvimento (Porta 3000). |
| `npm run start:production` | Inicia o servidor Angular integrado ao proxy de Produção (Porta 4000). |
| `npm run server` | Inicializa o `json-server` na porta 3000 com o arquivo `db.json`. |
| `npm run server:production` | Inicializa o `json-server` na porta 4000 com o arquivo `db.production.json` e CORS liberado. |
| `npm run build --prod` | Compila a aplicação e gera os arquivos estáticos de produção na pasta `dist/`. |
| `npm test` | Executa os testes unitários da aplicação utilizando o Karma. |

---

## 📂 Estrutura de Arquivos de Configuração

* `src/environments/environment.ts`: Armazena as configurações globais da aplicação utilizando o prefixo `/api` para o redirecionamento do proxy.
* `proxy.conf.dev.json`: Configura o redirecionamento de chamadas do frontend para o servidor local na porta `3000`.
* `proxy.conf.prod.json`: Configura o redirecionamento de chamadas do frontend para o servidor simulado de produção na porta `4000`.

# DOCKER
## docker logs cursoangular-app-container
(Esse comando vai revelar a linha exata do erro ao iniciar o Nginx).

# 1. Cria uma rede interna chamada "rede-app"
docker network create rede-app

# 2. Para e remove o container do Angular que travou (e o da API antigo)
docker stop cursoangular-app-container cursoangular-api-container
docker rm cursoangular-app-container cursoangular-api-container

# 3. Roda a sua API conectada à nova rede (Mantenha o nome exato usado no nginx.conf)
docker run -d -p 4000:4000 \
  --name cursoangular-api-container \
  --network rede-app \
  cursoangular-api:latest

# 4. Reconstrói a imagem do Angular com o novo nginx.conf corrigido
docker build -t cursoangular-app:latest .

# 5. Roda o frontend conectado na mesma rede
docker run -d -p 4200:80 \
  --name cursoangular-app-container \
  --network rede-app \
  cursoangular-app:latest
