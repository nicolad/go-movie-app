# Apollo Client 3 Demo

CRUD example of Apollo Client 3 (with gqlgen)

(It's currently using `@apollo/client v3.0.0`.)

## Dependencies

- [Apollo Client 3](https://www.apollographql.com/client/)
- [graphql-codegen](https://graphql-code-generator.com/)
- [gqlgen](https://gqlgen.com/)
- [gorm](https://gorm.io/)

## Getting Started

### Server
```
docker-compose build                                         // Build the image
docker-compose run --rm api go run db/migration/migration.go // Migration
docker-compose run --rm api go run db/seed/seed.go           // Seed
docker-compose up                                            // Run the container
```

### Client
(Node v12.14.0)
```
npm i
npm run dev
```

The example site will be accessible at http://localhost:3000/


### About this demo app

`schema.graphqls` file is used by both the server (GraphQL schema) and client (`graphql-codegen` generates types and hooks).
