import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './resources/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { GuildModule } from './resources/guild/guild.module';
import { GameModule } from './resources/game/game.module';
import { SessionModule } from './resources/session/session.module';

export const environment = process.env.ENVIRONMENT === 'prod' ? '.prod' : '.dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['src/config/config.env', `src/config/config${environment}.env`],
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
    CacheModule.register(),
    GuildModule,
    GameModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
