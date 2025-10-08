import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  username?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  firstName?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  lastName?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email?: string;
}
