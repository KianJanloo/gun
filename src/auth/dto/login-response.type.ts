import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from 'src/user/dto/user.input';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => UserType)
  user: UserType;
}
