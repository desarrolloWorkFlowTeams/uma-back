import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getHello() {
    const forms = await this.httpService.axiosRef.get(
      'https://api.jotform.com/user/forms?apikey=ddc7795fedb5f77caea8a50468fcf968',
    );
    if (forms.data.responseCode === 200) {
      return forms.data.content;
    } else {
      return [];
    }
  }
}
