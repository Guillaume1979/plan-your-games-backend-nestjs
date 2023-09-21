import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

const environment = process.env.ENVIRONMENT === 'prod' ? '.prod' : '.dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        'src/config/config.env',
        `src/config/config${environment}.env`,
      ],
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
