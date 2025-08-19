import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { AppModule } from '../src/app.module';
import { FinanceForm } from '../src/model/dto/finance-form';
import knexConfig from './knexfile';
import knex from 'knex';

describe('Finance Microservice (E2E)', () => {
  let app: INestMicroservice;
  let client: any;
  let db: any;


  beforeAll(async () => {
    db = knex(knexConfig.test);
    await db.migrate.latest();
    await db.seed.run();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 8877 },
    });

    await app.listen();

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 8877 },
    });

    await client.connect();
  });

  afterAll(async () => {
    await db.destroy();
    await client.close();
    await app.close();
  });

  it('ping should return pong finance', async () => {
    const response = await client.send({ cmd: 'ping' }, {}).toPromise();
    expect(response).toBe('pong finance');
  });

  it('should create, find and delete a finance', async () => {
      const finance: FinanceForm = { value: '100.00', description: 'Teste E2E', user_id: 1 };

      const created = await client.send({ cmd: 'create-finance' }, finance).toPromise();
      expect(created.id).toBeDefined();

      const found = await client.send({ cmd: 'find-finance' }, { id: created.id }).toPromise();
      expect(found.description).toBe('Teste E2E');

      const deleted = await client.send({ cmd: 'delete-finance' }, { id: created.id }).toPromise();
      expect(deleted).toBeTruthy();
  });
});
