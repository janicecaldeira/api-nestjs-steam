import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  title: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  image_url: string;

  @Column({ nullable: false, type: 'varchar', length: 600 })
  summary: string;

  @Column({ nullable: false, type: 'varchar', length: 60 })
  genre: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  release_date: string;

  @Column({ nullable: true, type: 'integer' })
  like: number;

  @ManyToOne(() => User, (user) => user.games)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
