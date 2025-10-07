import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field(() => UUID)
  id!: string;

  @IsString()
  @Field()
  username!: string;

  @IsString()
  @Field()
  firstName!: string;

  @IsString()
  @Field()
  lastName!: string;

  @IsString()
  @Field()
  password!: string;

  @IsString()
  @IsEmail()
  @Field()
  email!: string;
}
