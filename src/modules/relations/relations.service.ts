import { Injectable } from '@nestjs/common';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Relations, RelationsDocument } from './model/relation.schema';

@Injectable()
export class RelationsService {
  constructor(
    @InjectModel(Relations.name)
    private readonly relationsModel: Model<RelationsDocument>,
  ) {}
  async create(createRelationDto: CreateRelationDto) {
    const relationExist = await this.relationsModel.findOne({
      formId: createRelationDto.formId,
    });
    if (!relationExist) {
      return await this.relationsModel.create(createRelationDto);
    } else {
      return await this.update(relationExist.id, createRelationDto);
    }
  }

  findAll() {
    return `This action returns all relations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} relation`;
  }

  async update(id: number, updateRelationDto: UpdateRelationDto) {
    const result = await this.relationsModel.updateOne(
      { id },
      { updateRelationDto },
    );
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} relation`;
  }
}
