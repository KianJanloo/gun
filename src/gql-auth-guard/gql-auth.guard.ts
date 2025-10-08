import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<{ req: Request }>();

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return false;
    }

    const payload = await this.authService.validToken(token);
    if (!payload) {
      return false;
    }
    req.user = payload;
    return true;
  }
}
