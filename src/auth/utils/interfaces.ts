export interface DiscordProfile {
  discordId: string;
  username: string;
  email: string;
  avatar: string;
  guilds: any[]; //todo à typer
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
