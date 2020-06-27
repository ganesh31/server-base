import { Resolver, Mutation, Arg } from 'type-graphql';
import { v4 as uuidV4 } from 'uuid';
import { sendEmail } from '../utils/sendEmail';
import { redis } from '../../redis';
import { User } from '../../entity/User';
import { forgotPasswordPrefix } from '../constants/redisPrefixes';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }
    const token = uuidV4();
    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24); // 1 day expiration

    const url = `http://localhost:3000/user/change-password/${token}`;
    await sendEmail(email, url);

    return true;
  }
}
