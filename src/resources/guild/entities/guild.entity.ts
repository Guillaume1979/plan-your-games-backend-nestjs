import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Guild {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  discordId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => User, (user) => user.guilds)
  members: User[];
}
