import { Injectable } from '@nestjs/common';
import { User } from '../resources/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordProfile } from './utils/interfaces';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async validateUser(profile: DiscordProfile): Promise<User> {
    let user = await this.#checkIfUserExists(profile);
    if (!user) {
      user = await this.#createUser(profile);
    } else {
      user = await this.#updateUserProfile(user, profile);
    }
    return user;
  }

  async #checkIfUserExists(profile: DiscordProfile): Promise<User> {
    return await this.userRepository.findOneBy({
      discordId: profile.discordId,
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
