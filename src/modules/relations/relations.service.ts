import { Injectable } from '@nestjs/common';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';

@Injectable()
export class RelationsService {
  create(createRelationDto: CreateRelationDto) {
    return createRelationDto;
  }

  findAll() {
    return `This action returns all relations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} relation`;
  }

  update(id: number, updateRelationDto: UpdateRelationDto) {
    return `This action updates a #${id} relation`;
  }

  remove(id: number) {
    return `This action removes a #${id} relation`;
  }
}
