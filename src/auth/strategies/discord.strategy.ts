import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ['identify', 'guilds', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('discord token', accessToken);
    console.log('discord strategy', profile);

    // return {
    //   id: profile.id,
    //   username: profile.username,
    //   discriminator: profile.discriminator,
    //   avatar: profile.avatar,
    //   guilds: profile.guilds,
    //   accessToken: accessToken,
    //   refreshToken: refreshToken,
    // };
  }
}
