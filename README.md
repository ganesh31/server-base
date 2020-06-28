# Server-base

This is a server boilerplate developed using,

- core - `type-graphql`
- database - `postgres`, `redis`
- connection-layer - `typeORM`
- testing - `ts-jest`

## Features!

- User Authentication Flow
  - Register User
  - Confrm user through email
  - Login/Logout user
  - forgot password
  - change password
  - session management with redis

### Prerequisite

Required [Node.js](https://nodejs.org/), [Postgres](https://www.postgresql.org/), [Redis](https://redis.io/).

- Postgres Install - [install Postgres](http://postgresguide.com/setup/install.html)
- Setting up DB - [DB Setup](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)
- Redis (only for mac/Linux for windows need to enable WSL): [redis setup](https://auth0.com/blog/introduction-to-redis-install-cli-commands-and-data-types/)
- Create DB and users based on `ormconfig.json` or update the `ormconfig.json` with existing database

### Installation

```sh
git clone https://github.com/ganesh31/server-base.git
cd ser-base
yarn
```

### Start Server

```sh
yarn start
```

The graphql playground will start at `http://localhost:4000/graphql`
