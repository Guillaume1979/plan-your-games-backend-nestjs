import { Injectable } from '@nestjs/common';
import { User } from '../resources/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AccessToken, DiscordProfile, Payload } from './utils/interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Guild } from '../resources/guild/entities/guild.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Guild) private readonly guildRepository: Repository<Guild>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(profile: DiscordProfile): Promise<User> {
    let user = await this.#checkIfUserExists(profile);
    if (!user) {
      user = await this.#createUser(profile);
    } else {
      user = await this.#updateUserProfile(user, profile);
    }
    return user;
  }

  async generateToken(user: User): Promise<AccessToken> {
    const payload: Payload = {
      sub: user.uuid,
      username: user.username,
      avatar: user.avatar,
    };
    return { access_token: this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_SECRET') }) } as AccessToken;
  }

  async #checkIfUserExists(profile: DiscordProfile): Promise<User> {
    return await this.userRepository.findOneBy({
      discordId: Equal(profile.discordId),
    });
  }

  async #createUser(profile: DiscordProfile): Promise<User> {
    const userToCreate = this.userRepository.create(profile);
    userToCreate.guilds = await this.#updateGuilds(profile.guilds);
    return await this.userRepository.save(userToCreate);
  }

  async #updateUserProfile(userInDB: User, profile: DiscordProfile): Promise<User> {
    const userToUpdate: User = { ...userInDB, ...profile };
    userToUpdate.guilds = await this.#updateGuilds(profile.guilds);
    return await this.userRepository.save(userToUpdate);
  }

  async #updateGuilds(guilds: any[]) {
    const guildsToLinkToTheUser: Guild[] = [];
    for (const guild of guilds) {
      let guildInDB = await this.guildRepository.findOneBy({ discordId: guild.id });
      if (guildInDB) {
        // if the guild already exists just update the information except discord id and uuid
        guildInDB = { ...guildInDB, ...guild };
      } else {
        // if the guild doesn't exist yet the guild is created and the received id is put in the discordId property
        const newGuild = this.guildRepository.create(guild as Guild);
        newGuild.discordId = guild.id;
        guildInDB = await this.guildRepository.save(newGuild);
      }
      guildsToLinkToTheUser.push(guildInDB);
    }
    return guildsToLinkToTheUser;
  }
}
