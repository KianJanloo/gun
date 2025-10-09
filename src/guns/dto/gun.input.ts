import {
  ObjectType,
  Field,
  ID,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { GunType } from '../entities/gun.entity';

registerEnumType(GunType, { name: 'GunType' });

@ObjectType()
export class Gun {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  model: string;

  @Field(() => GunType)
  type: GunType;

  @Field({ nullable: true })
  caliber?: string;

  @Field(() => Int, { nullable: true })
  magazineCapacity?: number;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field(() => Float, { nullable: true })
  barrelLength?: number;

  @Field()
  isAvailable: boolean;
}
