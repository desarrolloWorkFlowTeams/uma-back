import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LeadsService {
  private readonly webhookB24 = process.env.WEBHOOK_B24;
  constructor(private readonly httpService: HttpService) {}
  create(createLeadDto: CreateLeadDto) {
    return 'This action adds a new lead';
  }

  async findAll() {
    const deals = await this.httpService.axiosRef.get(
      `${this.webhookB24}/crm.lead.list`,
    );
    if (deals.data) {
      const keys = Object.keys(deals.data.result[0]);
      return keys;
    } else {
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  update(id: number, updateLeadDto: UpdateLeadDto) {
    return `This action updates a #${id} lead`;
  }

  remove(id: number) {
    return `This action removes a #${id} lead`;
  }
}
