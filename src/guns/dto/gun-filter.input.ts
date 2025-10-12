import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { GunType } from '../entities/gun.entity';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortOrder, { name: 'SortOrder' });
registerEnumType(GunType, { name: 'GunType' });

@InputType()
export class GunFilterInput {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class GunSortInput {
  @Field(() => SortOrder, { nullable: true })
  name?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: SortOrder;
}
