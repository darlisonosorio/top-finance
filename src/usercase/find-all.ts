import { Injectable } from "@nestjs/common";
import { ListFinanceResult } from "../model/dto/list-finance";
import { FinanceRepository } from "../repository/finance.repository";

@Injectable()
export class FindAllUsecase {
  constructor(private readonly financeRepository: FinanceRepository) {}

    async execute(search?: string, pageParam?: number, limitParam?: number): Promise<ListFinanceResult> {
    const page = pageParam && pageParam > 0 ? pageParam : 1;
    const limit = limitParam && limitParam > 0 ? limitParam : 10;

    const offset = (page - 1) * limit;

    const [data, total] = await this.financeRepository.findAll(search, offset, limit);

    return {
      data: data,
      meta: {
        total: Number(total?.count ?? 0),
        page,
        limit,
        totalPages: Math.ceil(Number(total?.count ?? 0) / limit),
      }
    };
  }
}