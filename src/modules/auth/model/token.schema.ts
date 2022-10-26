import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Document, Model } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema({ timestamps: true })
export class Token extends Model {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  access_token: string;

  @Prop({ required: true })
  expires: number;

  @Prop()
  expires_in: number;

  @Prop({ default: 'user' })
  scope: string;

  @Prop()
  domain: string;

  @Prop()
  server_endpoint: string;

  @Prop()
  status: string;

  @Prop()
  client_endpoint: string;

  @Prop()
  member_id: string;

  @Prop()
  user_id: number;

  @Prop()
  refresh_token: string;

  @Prop({
    unique: true,
    sparse: true,
  })
  resetPasswordToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

// {
//   "access_token": "d55a5963005e88390051c7b300000058808f073765ac207102328cdf44ee2748fa8bfe",
//   "expires": 1666800341,
//   "expires_in": 3600,
//   "scope": "app",
//   "domain": "oauth.bitrix.info",
//   "server_endpoint": "https://oauth.bitrix.info/rest/",
//   "status": "L",
//   "client_endpoint": "https://workflowteams.bitrix24.es/rest/",
//   "member_id": "de8a86baab829293f6c14beedf688e0c",
//   "user_id": 88,
//   "refresh_token": "c5d98063005e88390051c7b300000058808f071deb69b5611136654903bede9245cd22"
// }
