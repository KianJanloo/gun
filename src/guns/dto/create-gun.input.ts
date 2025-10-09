import {
  InputType,
  Field,
  registerEnumType,
  Int,
  Float,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GunType } from '../entities/gun.entity';

registerEnumType(GunType, {
  name: 'GunType',
});

@InputType()
export class CreateGunInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  model: string;

  @IsEnum(GunType)
  @Field(() => GunType)
  type: GunType;

  @IsString()
  @IsNotEmpty()
  @Field()
  caliber: string;

  @IsNumber()
  @Type(() => Number)
  @Field(() => Int)
  magazineCapacity: number;

  @IsNumber()
  @Type(() => Number)
  @Field(() => Float)
  weight: number;

  @IsNumber()
  @Type(() => Number)
  @Field(() => Float)
  barrelLength: number;

  @IsBoolean()
  @Type(() => Boolean)
  @Field(() => Boolean)
  isAvailable: boolean;
}
