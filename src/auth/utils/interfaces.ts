export interface DiscordProfile {
  discordId: string;
  username: string;
  email: string;
  avatar: string;
  guilds: any[]; //todo à typer
  accessToken: string;
  refreshToken: string;
}
