import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ContactsService {
  private readonly webhookB24 = process.env.WEBHOOK_B24;
  constructor(private readonly httpService: HttpService) {}
  create(createContactDto: CreateContactDto) {
    return 'This action adds a new contact';
  }

  async findAll() {
    const contacts = await this.httpService.axiosRef.get(
      `${this.webhookB24}/crm.contact.fields`,
    );
    if (contacts.data) {
      return contacts.data.result;
    } else {
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
