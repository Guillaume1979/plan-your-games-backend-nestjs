import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord-auth';
import { DiscordProfile } from '../utils/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientId: configService.get<string>('DISCORD_CLIENT_ID'),
      clientSecret: configService.get<string>('DISCORD_CLIENT_SECRET'),
      callbackUrl: configService.get<string>('DISCORD_REDIRECT_URI'),
      scope: ['identify', 'guilds', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const user: DiscordProfile = {
      discordId: profile.id,
      username: profile.username,
      nickname: profile.global_name,
      email: profile.email,
      avatar: profile.avatar,
      guilds: profile.guilds,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return done(null, user);
  }
}
