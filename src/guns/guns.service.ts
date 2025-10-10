import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGunInput } from './dto/create-gun.input';
import { UpdateGunInput } from './dto/update-gun.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Gun } from './entities/gun.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GunsService {
  constructor(
    @InjectRepository(Gun)
    private readonly gunsRepository: Repository<Gun>,
  ) {}

  async create(createGunInput: CreateGunInput) {
    const gun = this.gunsRepository.create(createGunInput);
    return await this.gunsRepository.save(gun);
  }

  async findAll(page?: number, limit?: number) {
    const [guns, count] = await this.gunsRepository.findAndCount({
      skip: page && limit ? (page - 1) * limit : 0,
      take: limit || 10,
    });
    return { guns, total: count };
  }

  async findOne(id: string) {
    const gun = await this.gunsRepository.findOne({ where: { id } });
    if (!gun) {
      throw new NotFoundException(`Gun with ID ${id} not found`);
    }
    return gun;
  }

  async update(id: string, updateGunInput: UpdateGunInput) {
    const gun = await this.gunsRepository.findOne({ where: { id } });
    if (!gun) {
      throw new NotFoundException(`Gun with ID ${id} not found`);
    }

    const updatedGun = Object.assign(gun, updateGunInput);
    await this.gunsRepository.save(updatedGun);

    return updatedGun;
  }

  async remove(id: string) {
    const gun = await this.gunsRepository.findOne({ where: { id } });
    if (!gun) {
      throw new NotFoundException(`Gun with ID ${id} not found`);
    }
    await this.gunsRepository.remove(gun);
    return { message: `Gun with ID ${id} has been removed` };
  }
}
