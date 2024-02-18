import { Controller, Get, Inject, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { AuthService } from './auth.service';
import { nanoid } from 'nanoid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from './utils/interfaces';
import { User } from '../resources/user/entities/user.entity';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Get('discord/login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return 'login';
  }

  @Public()
  @Get('discord/redirect')
  @UseGuards(DiscordAuthGuard)
  async redirect(@Req() req: any, @Res() res: any) {
    const user: User = await this.authService.validateUser(req.user);
    const uuid = nanoid();
    await this.cacheManager.set(`temp-user-code__${uuid}`, user, 10000);
    res.redirect(`${this.configService.get<string>('CORS_ORIGIN')}/login?code=${uuid}`);
  }

  @Public()
  @Post('discord/getJwtToken')
  async getJwtToken(@Req() req: any): Promise<AccessToken> {
    const authorization = req.get('Authorization');
    if (!authorization) throw new UnauthorizedException();

    const code = authorization.replace('Bearer ', '');
    if (!code) throw new UnauthorizedException();

    const user = await this.cacheManager.get<User>(`temp-user-code__${code}`);
    if (!user) throw new UnauthorizedException();

    return await this.authService.generateToken(user);
  }
}
