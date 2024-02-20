export interface DiscordProfile {
  discordId: string;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  guilds: any[]; //not equivalent to the type Guild because the received id correspond to discordId
  accessToken: string;
  refreshToken: string;
}

export interface AccessToken {
  access_token: string;
}

export interface Payload {
  sub: string;
  username: string;
  avatar: string;
}
