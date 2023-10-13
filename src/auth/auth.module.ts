import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './strategies/discord.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../resources/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'discord',
      session: false,
    }),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [AuthService, DiscordStrategy, JwtService],
})
export class AuthModule {}
