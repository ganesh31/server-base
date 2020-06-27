import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';
import { isAuth } from '../../middleware/isAuth';

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    if (ctx.req.session?.userId) {
      const user = await User.findOne({ where: { id: ctx.req.session?.userId } });
      if (!user) {
        return null;
      }
      return user;
    }

    return null;
  }
}
