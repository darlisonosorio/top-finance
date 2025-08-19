### TOP-FINANCE

## Description

A [Nest](https://github.com/nestjs/nest) microservice Application that integrates with an API-Gateway


## Prerequisites

Before starting, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)


## Environment Variables

This project requires some environment variables to be configured.  
You can create a `.env` file in the root directory with the following content:

```env
DB_URL=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=db_finance
TOP_USERS_URL=localhost
TOP_USERS_PORT=8888
```

## Project setup

```bash
$ pnpm install
```

## Migrations and Seeds

```bash
$ npx knex migrate:latest
```

```bash
$ knex seed:run
```

## Compile and run

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# e2e tests
$ pnpm run test:e2e
```

