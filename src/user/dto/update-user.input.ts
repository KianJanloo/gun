import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @Field()
  username?: string;

  @IsString()
  @Field()
  firstName?: string;

  @IsString()
  @Field()
  lastName?: string;

  @IsString()
  @IsEmail()
  @Field()
  email?: string;
}
