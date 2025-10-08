import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from 'src/user/dto/user.input';
import { RegisterAuthInput } from './dto/register-auth.input';
import { LoginAuthInput } from './dto/login-auth.input';
import { LoginResponse } from './dto/login-response.type';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserType)
  async register(
    @Args('registerAuthInput', { type: () => RegisterAuthInput })
    registerAuthInput: RegisterAuthInput,
  ) {
    return this.authService.register(registerAuthInput);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginAuthInput', { type: () => LoginAuthInput })
    loginAuthInput: LoginAuthInput,
  ) {
    return this.authService.login(loginAuthInput);
  }
}
