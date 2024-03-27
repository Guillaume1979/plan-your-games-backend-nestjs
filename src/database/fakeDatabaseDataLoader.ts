import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../resources/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Guild } from '../resources/guild/entities/guild.entity';
import { Session } from '../resources/session/entities/session.entity';
import { Game } from '../resources/game/entities/game.entity';
import { environment } from '../app.module';

@Injectable()
export class FakeDatabaseDataLoader implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Guild) private guildRepository: Repository<Guild>,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    if (environment === '.dev') {
      await this.#loadFakeData();
    }
  }

  async #loadFakeData() {
    Logger.log('START Loading', 'FAKE DATA');
    await this.dataSource.synchronize(true);
    // await this.#loadUsers();
    await this.#loadGames();
    Logger.log('END Loading', 'FAKE DATA');
  }

  async #loadUsers() {
    const users = [{}];
  }

  async #loadGuilds() {}

  async #loadSessions() {
    const sessions = [
      {
        date: new Date(2022, 3, 1),
      },
    ];
  }

  async #loadGames() {
    const gameNames: string[] = ['Icarus', 'Dota 2', 'Victoria 3', 'Humankind', 'Mechabellum', 'HOI4', 'Star Citizen', 'Formula 1'];
    let gamesToCreate: Game[] = [];
    for (let i = 0; i < gameNames.length; i++) {
      const game = this.gameRepository.create({ name: gameNames[i] });
      gamesToCreate.push(game);
    }
    await this.gameRepository.save(gamesToCreate);
    Logger.verbose('Games added :', gamesToCreate);
  }
}
