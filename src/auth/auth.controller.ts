import { Controller, Get, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './guards/discord-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('discord/login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return 'login';
  }

  @Get('discord/redirect')
  @UseGuards(DiscordAuthGuard)
  redirect() {
    console.log('redirect');
    return 'redirect';
  }
}
