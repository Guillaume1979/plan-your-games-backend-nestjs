import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Guild {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  discordId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => User, (user) => user.guilds)
  members: User[];
}
