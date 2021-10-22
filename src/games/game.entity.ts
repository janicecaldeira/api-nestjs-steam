import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.games, {
    cascade: true,
  })
  @JoinTable()
  users: User[];

  addUsers(user: User) {
    if (this.users == null) {
      this.users = new Array<User>();
    }
    this.users.push(user);
  }
}
