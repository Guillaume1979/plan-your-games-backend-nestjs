import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
