import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.input';

@ObjectType()
export class USerPagination {
  @Field(() => [UserType])
  users: UserType[];

  @Field(() => Number)
  total: number;
}
