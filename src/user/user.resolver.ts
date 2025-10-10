import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UserType } from './dto/user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/gql-auth-guard/gql-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { USerPagination } from './dto/user.pagination';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Query(() => USerPagination, { name: 'users' })
  async findAll(
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
  ) {
    return this.userService.findAll(page, limit);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserType, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserType, { name: 'updateUser' })
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => UserType, { name: 'removeUser' })
  async removeUser(@Args('id', { type: () => ID }) id: string) {
    const result = await this.userService.remove(id);
    return result.message;
  }
}
