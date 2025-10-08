import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  profile_image: string;

  @Column({ nullable: false, default: 'user' })
  role: 'user' | 'admin';

  @Column({ default: new Date(), nullable: false })
  createdAt: Date;

  @Column({ default: new Date(), nullable: false })
  updatedAt: Date;
}
