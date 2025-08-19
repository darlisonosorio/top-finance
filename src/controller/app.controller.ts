import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { FinanceForm } from '../model/dto/finance-form';
import { DeleteFinanceUsecase } from '../usercase/delete-finance';
import { FindAllUsecase } from '../usercase/find-all';
import { FindOneUsecase } from '../usercase/find-one';
import { PersistFinanceUsecase } from '../usercase/persist-finance';

@Controller()
export class AppController {

  constructor(
    private readonly findAllUsecase: FindAllUsecase,
    private readonly findOneUsecase: FindOneUsecase,
    private readonly persistFinanceUsecase: PersistFinanceUsecase,
    private readonly deleteFinanceUsecase: DeleteFinanceUsecase
  ) {}

  @MessagePattern({ cmd: "ping" })
  ping(_: any) {
    return of("pong finance").pipe(delay(1000));
  }

  @MessagePattern({ cmd: 'find-all-finances' })
  async findAll(@Payload() data: {  search?: string, page?: number; limit?: number }) {
    const { search, page, limit } = data;
    return this.findAllUsecase.execute(search, page, limit);
  }

  @MessagePattern({ cmd: 'find-finance' })
  async findOne(@Payload() data: { id: number }) {
    return this.findOneUsecase.execute(data.id);
  }

  @MessagePattern({ cmd: 'create-finance' })
  async create(@Payload() data: FinanceForm) {
    return this.persistFinanceUsecase.execute(null, data);
  }

  @MessagePattern({ cmd: 'update-finance' })
  async update(@Payload() data: { id: number; [key: string]: any }) {
    const { id, ...updateData } = data;
    return this.persistFinanceUsecase.execute(id, updateData as FinanceForm);
  }
  
  @MessagePattern({ cmd: 'delete-finance' })
  async remove(@Payload() data: { id: number }) {
    return this.deleteFinanceUsecase.execute(data.id);
  }

}
