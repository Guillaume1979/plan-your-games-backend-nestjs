import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../resources/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Guild } from '../resources/guild/entities/guild.entity';
import { Session } from '../resources/session/entities/session.entity';
import { Game } from '../resources/game/entities/game.entity';
import { environment } from '../app.module';
import { ConfigService } from '@nestjs/config';
import { Role } from '../enums/role';

@Injectable()
export class FakeDatabaseDataLoader implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Guild) private guildRepository: Repository<Guild>,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (environment === '.dev' && JSON.parse(this.configService.get('LOAD_FAKE_DATA'))) {
      await this.#loadFakeData();
    }
  }

  async #loadFakeData() {
    Logger.log('START Loading', 'FAKE DATA');
    await this.dataSource.synchronize(true);
    await this.#loadGames();
    await this.#loadSessions();
    await this.#loadGuilds();
    await this.#loadUsers();
    Logger.log('END Loading', 'FAKE DATA');
  }

  createdGames: Game[] = [];
  createdSessions: Session[] = [];
  createdGuilds: Guild[] = [];

  async #loadUsers() {
    let usersToCreate: User[] = [];
    const users = [
      {
        username: 'Guitou123',
        nickname: 'Guitou',
        email: 'monadresse@toto.com',
        discordId: '0001',
        age: 44,
        role: Role.ADMIN,
      },
      {
        username: 'Raphy',
        nickname: 'Canardus',
        email: 'monadresse@coincoin.com',
        discordId: '0002',
        age: 15,
        role: Role.USER,
      },
      {
        username: 'Pinou',
        nickname: 'Lapinator',
        email: 'monadresse@carotte.com',
        discordId: '0003',
        age: 13,
        role: Role.USER,
      },
      {
        username: 'Capucine',
        nickname: "Pupuce d'amour",
        email: 'monadresse@coeurdamour.com',
        discordId: '0004',
        age: 15,
        role: Role.USER,
      },
    ];
    users.forEach((user, index) => {
      const newUser = this.userRepository.create(user);
      if (index === 0) {
        newUser.guilds = [this.createdGuilds[0]];
        newUser.guilds.push(this.createdGuilds[1]);
        newUser.guilds.push(this.createdGuilds[3]);
        newUser.sessions = [this.createdSessions[0]];
        newUser.sessions.push(this.createdSessions[1]);
        newUser.sessions.push(this.createdSessions[2]);
      }
      if (index === 1) {
        newUser.guilds = [this.createdGuilds[0]];
        newUser.guilds.push(this.createdGuilds[1]);
        newUser.guilds.push(this.createdGuilds[2]);
        newUser.sessions = [this.createdSessions[2]];
      }
      if (index === 2) {
        newUser.guilds = [this.createdGuilds[2]];
        newUser.guilds.push(this.createdGuilds[4]);
        newUser.sessions = [this.createdSessions[2]];
      }
      if (index === 3) {
        newUser.guilds = [this.createdGuilds[1]];
        newUser.guilds.push(this.createdGuilds[4]);
        newUser.sessions = [this.createdSessions[1]];
        newUser.sessions.push(this.createdSessions[2]);
        newUser.sessions.push(this.createdSessions[0]);
      }
      usersToCreate.push(newUser);
    });
    console.log(usersToCreate);
    await this.userRepository.save(usersToCreate);
    Logger.verbose('Users added :', usersToCreate);
  }

  async #loadGuilds() {
    let guildsToCreate: Guild[] = [];
    const guilds = [
      {
        name: 'La compagnie de TOTO',
        discordId: '123',
        icon: '123456',
      },
      {
        name: 'La bande de Pifou',
        discordId: '234',
        icon: '123456',
      },
      {
        name: 'Picsou Club',
        discordId: '345',
        icon: '123456',
      },
      {
        name: 'Les roturiers',
        discordId: '456',
        icon: '123456',
      },
      {
        name: 'POWER RANGERS',
        discordId: '567',
        icon: '123456',
      },
    ];

    for (let i = 0; i < guilds.length; i++) {
      const guild = this.guildRepository.create(guilds[i]);
      guildsToCreate.push(guild);
    }

    this.createdGuilds = await this.guildRepository.save(guildsToCreate);
    Logger.verbose('Guilds added :', this.createdGuilds);
  }

  async #loadSessions() {
    let sessionsToCreate: Session[] = [];
    const sessions = [
      {
        date: new Date(2022, 3, 1),
        game: this.createdGames[2],
        title: "L'autriche vaincra !!!",
      },
      {
        date: new Date(2023, 9, 19),
        game: this.createdGames[5],
        title: 'La Ligne Maginot ? Hein !',
      },
      {
        date: new Date(2024, 1, 5),
        game: this.createdGames[0],
      },
    ];

    for (let i = 0; i < sessions.length; i++) {
      const session = this.sessionRepository.create(sessions[i]);
      sessionsToCreate.push(session);
    }

    this.createdSessions = await this.sessionRepository.save(sessionsToCreate);
    Logger.verbose('Sessions added :', this.createdSessions);
  }

  async #loadGames() {
    const gameNames: string[] = ['Icarus', 'Dota 2', 'Victoria 3', 'Humankind', 'Mechabellum', 'HOI4', 'Star Citizen', 'Formula 1'];
    let gamesToCreate: Game[] = [];
    for (let i = 0; i < gameNames.length; i++) {
      const game = this.gameRepository.create({ name: gameNames[i] });
      gamesToCreate.push(game);
    }
    this.createdGames = await this.gameRepository.save(gamesToCreate);
    Logger.verbose('Games added :', this.createdGames);
  }
}
