import { Injectable } from "@nestjs/common";
import { RpcException } from '@nestjs/microservices';
import { Finance } from "src/model/dto/finance";
import { FinanceRepository } from "src/repository/finance.repository";

@Injectable()
export class DeleteFinanceUsecase {
  constructor(private readonly financeRepository: FinanceRepository) {}

  async execute(id: number): Promise<number> {
      const user = await this.financeRepository.findOne(id);
      
      if (!user) {
        throw new RpcException({
          statusCode: 404,
          message: `Finance with id ${id} not found`,
        });
      }

      if (user.is_deleted) {
        throw new RpcException({
          statusCode: 400,
          message: `Finance with id ${id} is already deleted`,
        });
      }

      return this.financeRepository.delete(id);
    }
  }
