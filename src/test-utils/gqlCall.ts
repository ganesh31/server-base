import { graphql, GraphQLSchema, ExecutionResult } from 'graphql';
import { createSchema } from '../utils/createSchema';
import { Maybe } from 'graphql/jsutils/Maybe';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: unknown;
  }>;
  userId?: string;
}

let schema: GraphQLSchema;

export const gqlCall = async ({
  source,
  variableValues,
  userId,
}: Options): Promise<ExecutionResult> => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
};
