import { Injectable, Logger } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import {
  Relations,
  RelationsDocument,
} from '../relations/model/relation.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FormsService {
  logger = new Logger();
  private readonly jotFormApi = process.env.JOTFORM_API_URL;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    @InjectModel(Relations.name)
    private readonly relationsModel: Model<RelationsDocument>,
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
    if (forms.data) {
      const content: any[] = forms.data.content;
      for (const form of content) {
        let newForm = form;
        const relation = await this.relationsModel.findOne({
          formId: newForm.id,
        });
        let relationId = '';
        this.logger.debug('*****   relation   *****', relation);
        if (relation) {
          relationId = relation.id;
        }

        newForm = {
          ...form,
          relationId,
        };
        const index = content.findIndex((item) => item.id === form.id);
        content[index] = newForm;
      }
      return content;
    } else {
      return [];
    }
    // if (forms.data.responseCode === 200) {
    //   const content: any[] = forms.data.content;
    //   console.log({ content });
    //   content.forEach((form) => {
    //     const relationId = this.findRelationByFormId(form.id);
    //
    //     const index = content.findIndex(form, content);
    //     content[index] = {
    //       ...content[index],
    //       relationId,
    //     };
    //   });
    //   console.log({ content });
    //   return content;
    // } else {
    //   return [];
    // }
  }

  async findOne(id: number, query) {
    const { client } = query;
    this.logger.debug('query => ', query);
    const config = this.config.get(client);
    this.logger.debug('config.webhookJotform =>', config.webhookJotform);
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
    this.logger.debug('config =>', config);
    this.logger.debug('config =>', config);
    const form = await this.httpService.axiosRef.get(
      `https://api.jotform.com/form/${id}/questions?apikey=${config.webhookJotform}`,
    );
    if (form.data.responseCode === 200) {
      return form.data.content;
    } else {
      return [];
    }
  }

  async findRelationByFormId(formId: string): Promise<string> {
    const relation: RelationsDocument = await this.relationsModel.findOne({
      formId,
    });
    console.log({ relation });
    if (!relation.toObject()) {
      return '';
    } else {
      return relation.id;
    }
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
