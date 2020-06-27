import 'reflect-metadata';
import cors from 'cors';
import { Redis } from 'ioredis';
import connectRedis from 'connect-redis';
import Express from 'express';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';

import { redis } from './redis';
import { createSchema } from './utils/createSchema';

const SESSION_SECRET = 'asdfghv1234tcfg';
const RedisStore = connectRedis(session);

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });

  const app = Express();
  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis as Redis,
    }),
    name: 'qid',
    secret: SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    }),
  );
  apolloServer.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
};

main();
