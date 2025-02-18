import { Module } from '@nestjs/common';
import { TwilightApiController } from './twilight-api.controller';
import { TwilightApiService } from './twilight-api.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TwilightApiController],
  providers: [TwilightApiService],
})
export class TwilightApiModule {}
