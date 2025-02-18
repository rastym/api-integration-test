import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InfectionsQueryDto } from './dto/Infections-query-dto';
import { ConfigService } from '@nestjs/config';

enum EApiEndpoints {
  infections = 'https://api3.twilightcyber.com/infections/_search',
}

@Injectable()
export class TwilightApiService {
  private readonly TWILIGHT_API_KEY: string;
  constructor(private configService: ConfigService) {
    this.TWILIGHT_API_KEY = this.configService.get<string>(
      'TWILIGHT_API_KEY',
    ) as string;
  }

  // Method to fetch data from the "Infections" API
  async fetchInfections({ domain }: InfectionsQueryDto): Promise<any> {
    try {
      const response = await axios.post(
        EApiEndpoints.infections,
        { root_domains: [domain], size: 100 },
        {
          headers: {
            Authorization: `Bearer ${this.TWILIGHT_API_KEY}`, // Add Authorization header
          },
        },
      );
      return response.data; // Return the data from the response
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching data from TwilightCyber API');
    }
  }
}
