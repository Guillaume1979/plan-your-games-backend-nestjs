import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../../enums/role';
import { Guild } from '../../guild/entities/guild.entity';
import { Session } from '../../session/entities/session.entity';

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

  @ManyToMany(() => Guild, (guild) => guild.members, { nullable: true, eager: true })
  @JoinTable()
  guilds: Guild[];

  @ManyToMany(() => Session, (session) => session.participants, { nullable: true })
  @JoinTable()
  sessions: Session[];
}
