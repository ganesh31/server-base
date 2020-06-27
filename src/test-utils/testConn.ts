import { createConnection, Connection } from 'typeorm';
import { join } from 'path';

export const testConn = (drop = false): Promise<Connection> => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'type-graphql-test',
    synchronize: drop,
    dropSchema: drop,
    entities: [join(__dirname, '../entity/*.*')],
  });
};
