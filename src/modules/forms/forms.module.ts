import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Relations, RelationsSchema } from '../relations/model/relation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Relations.name, schema: RelationsSchema },
    ]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
