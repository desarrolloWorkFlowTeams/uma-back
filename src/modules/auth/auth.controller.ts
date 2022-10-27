import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/code/:client')
  async getCode(@Param() client) {
    const url = await this.authService.getCode(client);
    return { url };
  }

  @Get('/token')
  async getToken(@Query() query, @Res() res) {
    const id = await this.authService.getToken(query);
    if (id) {
      return res.redirect(`/v1/auth/front/${id}`);
    }
  }

  @Get('/front/:id')
  async redirectToApp(@Param('id') id: string, @Res() res) {
    const urlToRedirectApp = await this.authService.redirectToApp(id);
    return res.redirect(`${urlToRedirectApp}`);
  }
}
