# Multiple Email Providers

[![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/) [![nodejs](https://badgen.net/npm/node/next)](https://www.typescriptlang.org/)

HTTP Based API that sends emails through different providers to prevent downtime.

## Technologies

- NodeJS 12
- Typescript
- ExpressJS

I chose this stack because it works well for this type of microservices and I'm also familiar with it. I like how the language (Javascript/Typescript) and platform (NodeJS) evolved over the past few years. There are also mature libraries / frameworks by now and the community keeps growing. It also has better developer experience compared to technologies like Java.

ExpressJS is the most popular micro framework for NodeJS, but I could also have used Koa or something more oriented to building APIs like Hapi.

Typescript is a big improvement to the stack because it adds robustness and mantainability to the application. It may be harder to setup but it improves the dx: makes the code easier to read, write (better autocomplete) and refactor, besides adding documentation.

[Check technical / architectural decisions document for more details](docs/decisions.md)

## Development

1. Install dependencies

```
npm i
```

2. This project uses [dotenv](https://www.npmjs.com/package/dotenv) so you'll need to create an `.env` file with the configurtion. Use `.env.example` as reference.

> Note: provider number defines priority

3. Start the server in dev mode

```
npm run dev
```

## Run the application locally

Using `docker` and `docker-compose` you can easily recreate the environment:

- NodeJS server
- Swagger UI
- PostgreSQL

1. Open `docker-compose.yml` and edit the env variables accordingly.

> Note: provider number defines priority

2. Install dependencies and build the app

```
npm i
npm run build
```

3. Start the application

```
docker-compose up
```

The application is exposed on port **http://localhost:3000** by default and swagger ui on **http://localhost:9999**

## Run tests

The tests are implemented in [jest](https://jestjs.io/). To run them:

```
npm test
```

## Code style and linting

Code style is enforced with `prettier` and linting is done by `tslint`. To run it manually:

```
npm run lint
```

## API Documentation

[OpenAPI](http://spec.openapis.org/oas/v3.0.2) was used to document the API. It is exposed on http://localhost:3000/api-docs to be consumed by `swagger-ui`

## Status endpoints

Two endpoints are exposed as reference:

- `/status/health` - to check availability
- `/status/config` - to expose the config
