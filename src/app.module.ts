import { Delete, Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { KnexModule } from 'nest-knexjs';
import { FinanceRepository } from './repository/finance.repository';
import { FindAllUsecase } from './usercase/find-all';
import { FindOneUsecase } from './usercase/find-one';
import { PersistFinanceUsecase } from './usercase/persist-finance';
import { DeleteFinanceUsecase } from './usercase/delete-finance';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
          host: process.env.DB_URL || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432'),
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          database: process.env.DB_NAME || '',
        },
      },
    }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.TOP_USERS_URL || 'localhost',
          port: parseInt(process.env.TOP_USERS_PORT || '8888'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    FinanceRepository,
    UserRepository,
    FindAllUsecase,
    FindOneUsecase,
    PersistFinanceUsecase,
    DeleteFinanceUsecase
  ],
})
export class AppModule {}
