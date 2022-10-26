import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';
import { config } from 'dotenv';
import { FormsModule } from './modules/forms/forms.module';
import { DealsModule } from './modules/deals/deals.module';
import { LeadsModule } from './modules/leads/leads.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { RelationsModule } from './modules/relations/relations.module';
import * as mongoose_delete from 'mongoose-delete';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        console.log('*****   process.env.DB_URI     *****', process.env.DB_URI);
        return {
          uri: process.env.DB_URI,
          connectionFactory: (connection) => {
            connection.plugin(mongoose_delete, {
              overrideMethods: 'all',
            });
            console.log(
              '******  mongo connection  ****** ',
              process.env.DB_URI,
            );
            return connection;
          },
        };
      },
    }),
    FormsModule,
    DealsModule,
    LeadsModule,
    ContactsModule,
    CompaniesModule,
    AuthModule,
    RelationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
