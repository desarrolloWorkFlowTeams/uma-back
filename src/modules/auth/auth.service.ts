import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './model/token.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  tokens: any[] = [];
  logger = new Logger();
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}
  async getCode(data: { client: string }) {
    const { client } = data;
    const config = this.config.get(client);
    return `${config.server}/oauth/authorize/?client_id=${
      config.clientId
    }&response_type=code&redirect_uri=${encodeURI(config.uri)}`;
  }

  async getToken(query) {
    // const { code } = query;
    this.logger.debug('query => ', { query });
    const response = await this.httpService.axiosRef.get(
      `${process.env.TOKEN_URL}/?client_id=${process.env.CLIENT_ID}&grant_type=authorization_code&client_secret=${process.env.CLIENT_SECRET}&code=${query.code}`,
    );
    this.logger.debug('res.headers => ', response.data);
    if (!response.data)
      throw new HttpException(`${response.statusText}`, response.status);
    const result = await this.tokenModel.create(response.data);

    return result.id;
  }

  async redirectToApp(id) {
    const tokenObj = await this.tokenModel.findOne({ id });
    const client = tokenObj.client_endpoint
      .split('.')[0]
      .replace('https://', '');
    const config = this.config.get(client);
    return `${config.appUrl}?access_token=${tokenObj.access_token}`;
  }
}
