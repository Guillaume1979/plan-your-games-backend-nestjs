import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: false })
  date: Date;

  @ManyToOne(() => Game, (game) => game.sessions)
  game: Game;

  @ManyToMany(() => User, (user) => user.sessions)
  participants: User[];
}
