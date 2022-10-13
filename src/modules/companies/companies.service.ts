import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CompaniesService {
  private readonly webhookB24 = process.env.WEBHOOK_B24;
  constructor(private readonly httpService: HttpService) {}
  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

  async findAll() {
    const companies = await this.httpService.axiosRef.get(
      `${this.webhookB24}/crm.company.fields`,
    );
    if (companies.data) {
      return companies.data.result;
    } else {
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
