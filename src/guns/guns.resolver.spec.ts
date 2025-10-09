import { Test, TestingModule } from '@nestjs/testing';
import { GunsResolver } from './guns.resolver';
import { GunsService } from './guns.service';

describe('GunsResolver', () => {
  let resolver: GunsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GunsResolver, GunsService],
    }).compile();

    resolver = module.get<GunsResolver>(GunsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
