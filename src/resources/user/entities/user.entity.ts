import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../../enums/role';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  nickname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  discordId: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ type: 'enum', enum: Role, default: Role.USER, nullable: false })
  role: Role;

  //todo guilds: Guild[];
  //todo sessions: Session[];
}
