import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRelationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  client: string;

  @ApiProperty()
  @IsNumber()
  formId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bitrixType: string;

  @ApiProperty()
  @IsArray()
  relations: [string[]];
}
