import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  const loginAuthInputMock = {
    email: 'test@example.com',
    password: 'password',
  };
  const registerAuthInputMock = {
    email: 'test@example.com',
    password: 'password',
    username: 'test user',
    firstName: 'Test',
    lastName: 'User',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthResolver],
    }).compile();

    authResolver = app.get<AuthResolver>(AuthResolver);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(authResolver).toBeDefined();
    });
  });

  describe('login', () => {
    it('should return undefined', () => {
      expect(authResolver.login(loginAuthInputMock)).toBeUndefined();
    });
  });

  describe('register', () => {
    it('should return undefined', () => {
      expect(authResolver.register(registerAuthInputMock)).toBeUndefined();
    });
  });
});
