import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../../session/entities/session.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @OneToMany(() => Session, (session) => session.game)
  sessions: Session[];
}
