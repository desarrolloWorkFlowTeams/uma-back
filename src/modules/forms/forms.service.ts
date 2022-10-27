import { Injectable, Logger } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FormsService {
  logger = new Logger();
  private readonly jotFormApi = process.env.JOTFORM_API_URL;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  create(createFormDto: CreateFormDto) {
    return 'This action adds a new form';
  }

  async findAll(query) {
    const { client } = query;
    this.logger.debug('query => ', query);
    const config = this.config.get(client);
    const forms = await this.httpService.axiosRef.get(
      `${this.jotFormApi}/user/forms?apikey=${config.webhookJotform}`,
    );
    if (forms.data.responseCode === 200) {
      const content: any[] = forms.data.content;
      return content.map((form, index) => {
        let newForm = form;
        if (index % 2 === 0) {
          newForm = {
            ...newForm,
            itsRelated: true,
          };
        } else {
          newForm = {
            ...newForm,
            itsRelated: false,
          };
        }
        return newForm;
      });
    } else {
      return [];
    }
  }

  async findOne(id: number, query) {
    const { client } = query;
    this.logger.debug('query => ', query);
    const config = this.config.get(client);
    const form = await this.httpService.axiosRef.get(
      `${this.jotFormApi}/form/${id}?apikey=${config.webhookJotform}`,
    );
    if (form.data.responseCode === 200) {
      return form.data.content;
    } else {
      return [];
    }
  }

  async findOneWitchQuestions(id: number, query) {
    const { client } = query;
    this.logger.debug('query => ', query);
    const config = this.config.get(client);
    const APIKEY = config.webhookJotform;
    const form = await this.httpService.axiosRef.get(
      `https://api.jotform.com/form/${id}/questions`,
      { headers: { APIKEY } },
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
