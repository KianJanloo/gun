import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gun } from './gun.input';

@ObjectType()
export class GunsPagination {
  @Field(() => [Gun])
  guns: Gun[];

  @Field(() => Int)
  total: number;
}
