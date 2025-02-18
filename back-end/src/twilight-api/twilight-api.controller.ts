import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TwilightApiService } from './twilight-api.service';
import { InfectionsQueryDto } from './dto/Infections-query-dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('search-by-domain')
export class TwilightApiController {
  constructor(private readonly apiService: TwilightApiService) {}

  @Post('infections')
  @UseGuards(JwtAuthGuard)
  async getInfections(@Body() payload: InfectionsQueryDto) {
    const { domain } = payload;
    if (!domain) {
      throw new Error('Domain parameter is required');
    }
    const data = await this.apiService.fetchInfections(payload);
    return data;
  }
}
