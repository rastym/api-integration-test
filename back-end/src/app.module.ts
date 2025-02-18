import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TwilightApiModule } from './twilight-api/twilight-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TwilightApiModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
