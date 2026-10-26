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
| `npm run start:prod` | Inicia o servidor Angular integrado ao proxy de Produção (Porta 4000). |
| `npm run server` | Inicializa o `json-server` na porta 3000 com o arquivo `db.json`. |
| `npm run server:production` | Inicializa o `json-server` na porta 4000 com o arquivo `db.production.json` e CORS liberado. |
| `npm run build` | Compila a aplicação e gera os arquivos estáticos de produção na pasta `dist/`. |
| `npm test` | Executa os testes unitários da aplicação utilizando o Karma. |

---

## 📂 Estrutura de Arquivos de Configuração

* `src/environments/environment.ts`: Armazena as configurações globais da aplicação utilizando o prefixo `/api` para o redirecionamento do proxy.
* `proxy.conf.dev.json`: Configura o redirecionamento de chamadas do frontend para o servidor local na porta `3000`.
* `proxy.conf.prod.json`: Configura o redirecionamento de chamadas do frontend para o servidor simulado de produção na porta `4000`.
