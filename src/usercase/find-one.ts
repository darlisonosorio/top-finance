import { Injectable } from "@nestjs/common";
import { RpcException } from '@nestjs/microservices';
import { Finance } from "../model/dto/finance";
import { FinanceRepository } from "../repository/finance.repository";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class FindOneUsecase {
  constructor(
    private readonly financeRepository: FinanceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<Finance> {
      const user = await this.financeRepository.findOne(id);
      
      if (!user) {
        throw new RpcException({
          statusCode: 404,
          message: `Finance with id ${id} not found`,
        });
      }

      user.user_name = (await this.userRepository.findById(user.user_id)).name;

      return user;
    }
  }
