import { testConn } from '../../../test-utils/testConn';
import { Connection } from 'typeorm';
import { gqlCall } from '../../../test-utils/gqlCall';

let connection: Connection;

beforeAll(async () => {
  connection = await testConn();
});

afterAll(async () => {
  await connection.close();
});

const registerMutation = `
mutation($user: RegisterInput!){
  register(user: $user){
    id
    email
    name
  }
}
`;

describe('Register', () => {
  it('create a user', async () => {
    console.log(
      await gqlCall({
        source: registerMutation,
        variableValues: {
          user: {
            firstName: 'bob',
            lastName: 'bob2',
            email: 'bob@bob.com',
            password: 'asdfasdf',
          },
        },
      }),
    );
  });
});
