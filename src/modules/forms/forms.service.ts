import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FormsService {
  constructor(private readonly httpService: HttpService) {}

  create(createFormDto: CreateFormDto) {
    return 'This action adds a new form';
  }

  async findAll() {
    const forms = await this.httpService.axiosRef.get(
      `https://api.jotform.com/user/forms?apikey=${process.env.APIKEY_JOTFORMS}`,
    );
    if (forms.data.responseCode === 200) {
      return forms.data.content;
    } else {
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
