import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class TokenDto {
  @ApiProperty({ required: true })
  @IsString()
  access_token: string;

  @ApiProperty({ required: true })
  @IsNumber()
  expires: number;

  @ApiProperty()
  @IsNumber()
  expires_in: number;

  @ApiProperty()
  @IsString()
  scope: string;

  @ApiProperty()
  @IsString()
  domain: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  server_endpoint: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  client_endpoint: string;

  @ApiProperty()
  @IsString()
  member_id: string;
}
