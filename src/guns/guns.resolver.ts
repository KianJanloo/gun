import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { GunsService } from './guns.service';
import { CreateGunInput } from './dto/create-gun.input';
import { UpdateGunInput } from './dto/update-gun.input';
import { Gun } from './dto/gun.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/gql-auth-guard/gql-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@Resolver(() => Gun)
export class GunsResolver {
  constructor(private readonly gunsService: GunsService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => Gun)
  async createGun(
    @Args('createGunInput') createGunInput: CreateGunInput,
  ): Promise<Gun> {
    return await this.gunsService.create(createGunInput);
  }

  @Query(() => [Gun], { name: 'guns' })
  async findAll(): Promise<Gun[]> {
    return await this.gunsService.findAll();
  }

  @Query(() => Gun, { name: 'gun' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Gun> {
    return await this.gunsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => Gun)
  async updateGun(
    @Args('updateGunInput') updateGunInput: UpdateGunInput,
  ): Promise<Gun> {
    return await this.gunsService.update(updateGunInput.id, updateGunInput);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => Gun)
  async removeGun(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<{ message: string }> {
    return await this.gunsService.remove(id);
  }
}
