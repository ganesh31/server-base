import { InputType, Field, ClassType } from 'type-graphql';
import { MinLength } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType({ isAbstract: true })
  class PasswordInput extends BaseClass {
    @Field()
    @MinLength(5)
    password: string;
  }
  return PasswordInput;
};
