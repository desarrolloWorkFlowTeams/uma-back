import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FormsService {
  private readonly jotFormApi = process.env.JOTFORM_API_URL;

  constructor(private readonly httpService: HttpService) {}

  create(createFormDto: CreateFormDto) {
    return 'This action adds a new form';
  }

  async findAll() {
    const forms = await this.httpService.axiosRef.get(
      `${this.jotFormApi}/user/forms?apikey=${process.env.APIKEY_JOTFORMS}`,
    );
    if (forms.data.responseCode === 200) {
      return forms.data.content;
    } else {
      return [];
    }
  }

  async findOne(id: number) {
    const form = await this.httpService.axiosRef.get(
      `${this.jotFormApi}/form/${id}?apikey=${process.env.APIKEY_JOTFORMS}`,
    );
    if (form.data.responseCode === 200) {
      return form.data.content;
    } else {
      return [];
    }
  }

  async findOneWitchQuestions(id: number) {
    const form = await this.httpService.axiosRef.get(
      `https://api.jotform.com/form/${id}/questions`,
      { headers: { APIKEY: process.env.APIKEY_JOTFORMS } },
    );
    if (form.data.responseCode === 200) {
      return form.data.content;
    } else {
      return [];
    }
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
