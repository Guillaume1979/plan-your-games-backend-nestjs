import { Injectable } from '@nestjs/common';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Guild } from './entities/guild.entity';

@Injectable()
export class GuildService {
  constructor(@InjectRepository(Guild) private readonly guildRepository: Repository<Guild>) {}
  create(createGuildDto: CreateGuildDto) {
    return 'This action adds a new guild';
  }

  async findAll() {
    return await this.guildRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} guild`;
  }

  update(id: number, updateGuildDto: UpdateGuildDto) {
    return `This action updates a #${id} guild`;
  }

  remove(id: number) {
    return `This action removes a #${id} guild`;
  }
}
