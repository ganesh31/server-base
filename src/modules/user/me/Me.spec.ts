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

const meQuery = `
{
  me{
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe('Me', () => {
  it.only('get the logged in user', async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gqlCall({
      source: meQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        },
      },
    });
  });
});
