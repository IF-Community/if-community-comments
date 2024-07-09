<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Microserviço de Comentários

## 📄 Apresentação

Este projeto foi desenvolvido com o framework NestJS, oferece uma API RESTful para gerenciamento de comentários. Ele é projetado para ser integrado facilmente em outras aplicações, fornecendo funcionalidades completas de CRUD para comentários.

Repositório: [IF-Community/if-community-api-gateway](https://github.com/IF-Community/if-community-api-gateway)

## 🛠️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

## ✨ Funcionalidades

- **Criar Comentário**
- **Listar Todos os Comentários**
- **Listar Comentários de um Post**
- **Listar Comentário Específico**
- **Dar Upvote ou Downvote em Comentário**
- **Desativar comentário**
- **Excluir comentário**

## ⚙️ Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)
- PostgreSQL

## 🚀 Execução

### 1 - Clone o repositório:

  ```bash
  git clone https://github.com/IF-Community/if-community-api-gateway.git
  cd if-community-api-gateway
  ```

### 2 - Instale as dependências:

  ```bash
  npm install
  ```

### 3 - Configure o banco de dados PostgreSQL. A configuração do banco de dados está localizada no arquivo app.module.ts:

  ```typescript

  const databaseConfig: TypeOrmModule = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'db',
  type: 'postgres',
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/migration/*{.ts,.js}'],
  migrationsRun: true,
  logging: true,
  autoLoadEntities: true,
  };

  ```

### 4 - Configure as variáveis de ambiente necessárias.

Crie um arquivo .env na raiz do projeto com as seguintes chaves:

  ```env
  // Chave de API (Utilizada para outros se comunicarem com a api)
  APIKEY=20ca7c6e-8661-430b-998b-cadaf04bf824

  // Manter true para testes com Swagger
  BYPASS_APIKEY=true

  ```

### 5 - Inicie o servidor:

  ```bash
  npm run start
  ```

O servidor estará em execução em http://localhost:3001.
