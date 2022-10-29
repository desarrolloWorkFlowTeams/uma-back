import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRelationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  client: string;

  @ApiProperty()
  @IsString()
  formId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bitrixType: string;

  @ApiProperty()
  @IsArray()
  relations: any[];
}
