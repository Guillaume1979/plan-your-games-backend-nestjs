import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { AuthService } from './auth.service';
import { DiscordProfile } from './utils/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('discord/login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return 'login';
  }

  @Get('discord/redirect')
  @UseGuards(DiscordAuthGuard)
  async redirect(@Req() req: any) {
    await this.authService.validateUser(req.user);
    // TODO vérifier si le user est en base
    // TODO si oui, mettre à jour ses infors Discord
    // TODO si non, créer le user
    // TODO générer un code avec nanoid et l'enregistrer dans le cache avec le user
    // TODO renvoyer le code dans l'URL
    return 'redirect';
  }

  @Get('discord/getJwtToken/:code')
  getJwtToken(@Param('code') code: string) {
    //todo : vérifier que le code est bien dans le cache
    //todo : vérifier que le code est bien associé à un user
    //todo : générer un token JWT
    //todo : renvoyer le token JWT
    return 'getJwtToken';
  }
}
