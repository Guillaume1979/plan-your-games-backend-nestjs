import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './strategies/discord.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DiscordStrategy],
})
export class AuthModule {}
