import { Injectable } from "@nestjs/common";
import { RpcException } from '@nestjs/microservices';
import { FinanceForm } from "src/model/dto/finance-form";
import { FinanceRepository } from "src/repository/finance.repository";
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PersistFinanceUsecase {
  constructor(private readonly financeRepository: FinanceRepository) {}

  async execute(id: number|null, data?: FinanceForm): Promise<number> {
    await this._validateData(data);

    if (id) {
      const existingUser = await this.financeRepository.findOne(id);
      if (!existingUser) {
        throw new RpcException({ statusCode: 404, message: `Finance with id ${id} not found` });
      }
      data!.created_at = existingUser.created_at;
      data!.is_deleted = existingUser.is_deleted;
    } else {
      data!.created_at = new Date();
    }
    
    const user = await this.financeRepository.persist(id, data!);

    return user;
  }

  async _validateData(data?: FinanceForm): Promise<void> {
    if (!data) {
      throw new RpcException({ statusCode: 400, message: 'Invalid finance data.' });
    }

    try {
      await validateOrReject(plainToInstance(FinanceForm, data));
    } catch (errors) {
      throw new RpcException({
        statusCode: 400, 
        message: errors
        .map((e) => Object.values(e.constraints || {}).join(', '))
        .join('; ')
      });
    }
  }

}
