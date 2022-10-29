import { Module } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { RelationsController } from './relations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Relations, RelationsSchema } from './model/relation.schema';

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
  controllers: [RelationsController],
  providers: [RelationsService],
})
export class RelationsModule {}
