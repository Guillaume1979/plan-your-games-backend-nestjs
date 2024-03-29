import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './strategies/discord.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../resources/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Guild } from '../resources/guild/entities/guild.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Guild]),
    PassportModule.register({
      defaultStrategy: 'discord',
      session: false,
    }),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    DiscordStrategy,
    JwtStrategy,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
