import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
