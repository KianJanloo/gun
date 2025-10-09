import { Module } from '@nestjs/common';
import { GunsService } from './guns.service';
import { GunsResolver } from './guns.resolver';
import { Gun } from './entities/gun.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gun]), AuthModule],
  providers: [GunsResolver, GunsService],
  exports: [GunsService],
})
export class GunsModule {}
