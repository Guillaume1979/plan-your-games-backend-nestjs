import { Injectable } from '@nestjs/common';
import { User } from '../resources/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AccessToken, DiscordProfile, Payload } from './utils/interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
    return await this.userRepository.save(userToCreate);
  }

  async #updateUserProfile(userInDB: User, profile: DiscordProfile): Promise<User> {
    const userToUpdate: User = { ...userInDB, ...profile };
    return await this.userRepository.save(userToUpdate);
  }
}
