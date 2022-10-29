import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Document, Model } from 'mongoose';

export type RelationsDocument = Relations & Document;

@Schema({ timestamps: true })
export class Relations extends Model {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  client: string;

  @Prop({ required: true })
  formId: string;

  @Prop({ required: true })
  bitrixType: string;

  @Prop({ required: true })
  relations: [];

  @Prop({
    unique: true,
    sparse: true,
  })
  resetPasswordRelations: string;
}

export const RelationsSchema = SchemaFactory.createForClass(Relations);

// {
//   "client": "grupoumacolombia",
//   "formId": 222854789650671,
//   "bitrixType": "companies",
//   "relations": [
//   [
//     "30_escribaUna30",
//     "ADDRESS_REGION"
//   ]
// ]
// }
