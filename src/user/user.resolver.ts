import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UserType } from './dto/user.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType], { name: 'users' })
  async findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => UserType)
  async removeUser(@Args('id', { type: () => ID }) id: string) {
    const result = await this.userService.remove(id);
    return result.message;
  }
}
