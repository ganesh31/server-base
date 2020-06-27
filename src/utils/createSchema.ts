import { buildSchema } from 'type-graphql';
import { join } from 'path';
import { GraphQLSchema } from 'graphql';

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [join(__dirname, '../modules/**/!(*.test|*.spec).ts')],
  });
