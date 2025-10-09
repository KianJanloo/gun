import {
  InputType,
  Field,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GunType } from '../entities/gun.entity';

registerEnumType(GunType, {
  name: 'GunType',
});

@InputType()
export class UpdateGunInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  model?: string;

  @IsEnum(GunType)
  @IsOptional()
  @Field(() => GunType, { nullable: true })
  type?: GunType;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  caliber?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field(() => Int, { nullable: true })
  magazineCapacity?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field(() => Float, { nullable: true })
  weight?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field(() => Float, { nullable: true })
  barrelLength?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @Field(() => Boolean, { nullable: true })
  isAvailable?: boolean;
}
