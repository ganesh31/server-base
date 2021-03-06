import { Connection } from 'typeorm';
import faker from 'faker';
import { testConn } from '../../../test-utils/testConn';
import { gqlCall } from '../../../test-utils/gqlCall';
import { User } from '../../../entity/User';

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
    firstName
    lastName
    email
    name
  }
}
`;

describe('Register', () => {
  it('create a user', async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const response = await gqlCall({
      source: registerMutation,
      variableValues: {
        user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });

    const dbUser = await User.findOne({ where: { email: user.email } });

    expect(dbUser).toBeDefined();
    expect(dbUser?.confirmed).toBeFalsy();
  });
});
