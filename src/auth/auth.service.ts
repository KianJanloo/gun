import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthInput } from './dto/register-auth.input';
import * as bcrypt from 'bcrypt';
import { LoginAuthInput } from './dto/login-auth.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user: User) {
    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      { expiresIn: '7d', secret: process.env.JWT_SECRET },
    );
    return token;
  }

  async validToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch {
      throw new Error('Invalid token');
    }
  }

  async register(registerAuthInput: RegisterAuthInput) {
    const user = this.usersRepository.create(registerAuthInput);

    const hashedPassword = await bcrypt.hash(registerAuthInput.password, 10);
    user.password = hashedPassword;

    return await this.usersRepository.save(user);
  }

  async login(loginAuthInput: LoginAuthInput) {
    const user = await this.usersRepository.findOne({
      where: { email: loginAuthInput.email },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginAuthInput.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = await this.createToken(user);
    return {
      token,
      user,
    };
  }
}
