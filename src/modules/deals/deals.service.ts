import { Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';

@Injectable()
@ApiTags('Deals')
export class DealsService {
  private readonly webhookB24 = process.env.WEBHOOK_B24;
  constructor(private readonly httpService: HttpService) {}
  create(createDealDto: CreateDealDto) {
    return 'This action adds a new deal';
  }

  async findAll() {
    const deals = await this.httpService.axiosRef.get(
      `${this.webhookB24}/crm.deal.fields`,
    );
    if (deals.data) {
      return deals.data.result;
    } else {
      return [];
    }
  }

  async findAllDealsAndContacts() {
    const deals = await this.findAll();
    let contacts = {};
    const req = await this.httpService.axiosRef.get(
      `${this.webhookB24}/crm.deal.fields`,
    );
    if (req.data) {
      contacts = { ...req.data.result };
    }
    if (contacts && deals) {
      return { contacts, deals };
    } else {
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} deal`;
  }

  update(id: number, updateDealDto: UpdateDealDto) {
    return `This action updates a #${id} deal`;
  }

  remove(id: number) {
    return `This action removes a #${id} deal`;
  }
}
