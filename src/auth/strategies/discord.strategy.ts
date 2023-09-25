import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord-auth';
import { DiscordProfile } from '../utils/interfaces';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackUrl: process.env.DISCORD_REDIRECT_URI,
      scope: ['identify', 'guilds', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const user: DiscordProfile = {
      discordId: profile.id,
      username: profile.username,
      email: profile.email,
      avatar: profile.avatar,
      guilds: profile.guilds,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return done(null, user);
  }
}
