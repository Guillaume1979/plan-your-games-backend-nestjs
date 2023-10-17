import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  discordId: string;

  @Column({ nullable: true })
  age?: number;

  //todo roles: Role[];
  //todo guilds: Guild[];
  //todo sessions: Session[];
}