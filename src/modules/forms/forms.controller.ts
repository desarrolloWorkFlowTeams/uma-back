import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('forms')
@ApiTags('Forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.formsService.findAll(query);
  }

  @Get(':id/questions')
  findOneWitchQuestions(@Param('id') id: string, @Query() query) {
    return this.formsService.findOneWitchQuestions(+id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query) {
    return this.formsService.findOne(+id, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formsService.remove(+id);
  }
}
