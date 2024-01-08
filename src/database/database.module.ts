import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [],
          autoLoadEntities: true,
          synchronize: JSON.parse(configService.get('DB_SYNCHRONIZE')),
          dropSchema: JSON.parse(configService.get('DB_DROP_SCHEMA')),
        }) as TypeOrmModuleAsyncOptions,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
