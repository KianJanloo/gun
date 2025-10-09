import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum GunType {
  COLT = 'colt',
  HANDGUN = 'handgun',
  RIFLE = 'rifle',
  SHOTGUN = 'shotgun',
  SNIPER = 'sniper',
  SMG = 'smg',
}

@Entity()
export class Gun {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  model: string;

  @Column({ type: 'enum', enum: GunType, nullable: false })
  type: GunType;

  @Column({ nullable: true })
  caliber: string;

  @Column({ type: 'int', nullable: true })
  magazineCapacity: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  barrelLength: number;

  @Column({ default: true })
  isAvailable: boolean;
}
