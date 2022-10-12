import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';
import { config } from 'dotenv';
import { FormsModule } from './modules/forms/forms.module';
config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
    }),
    FormsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
