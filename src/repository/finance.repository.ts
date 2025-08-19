import { BadRequestException, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { Finance } from "src/model/dto/finance";
import { FinanceForm } from "src/model/dto/finance-form";

@Injectable()
export class FinanceRepository {

  constructor(@InjectConnection() private readonly knex: Knex) {}

  findAll(search: string|undefined, offset: number, limit: number) {
    const query = this.knex('finance')
      .select('id', 'user_id', 'value', 'description')
      .where({ is_deleted: false });

    if (search) {
      query.andWhere((qb) => {
        qb.whereILike('description', `%${search}%`)
          .orWhere(this.knex.raw('CAST(value AS TEXT) ILIKE ?', [`%${search}%`]));
      });
    }
    
    query.orderBy('id', 'asc');

    const countQuery = this.knex('finance')
      .count<{ count: string }>({ count: '*' })
      .where({ is_deleted: false });

    if (search) {
      countQuery.andWhere((qb) => {
        qb.whereILike('description', `%${search}%`)
          .orWhere(this.knex.raw('CAST(value AS TEXT) ILIKE ?', [`%${search}%`]));
      });
    }

    return Promise.all([
      query.limit(limit).offset(offset),
      countQuery.first(),
    ]);
  }

  findOne(id: number): Promise<Finance> {
    return this.knex('finance')
      .select(
        'id', 
        'user_id', 
        'value', 
        'description', 
        'is_deleted', 
        'created_at', 
        'updated_at', 
        'deleted_at', 
      )
      .where({ id })
      .first();
  }

  async persist(id: number|null, data: FinanceForm): Promise<number> {
    const userData = {
      ...data,
      updated_at: new Date(),
    };

    try {
      const result = await (id 
        ? this.knex('finance')
          .update(userData)
          .where({ id })
          .returning('id')
          .then((result) => result[0])
        : this.knex('finance')
          .insert(userData)
          .returning('id')
          .then((result) => result[0]));
      return result;
    } catch (error) {
      throw new RpcException({
        statusCode: 400,
        message: 'Email already exists or invalid data.',
      });
    }
  }

  delete(id: number): Promise<number> {
    return this.knex('finance')
      .update({ is_deleted: true, deleted_at: new Date() })
      .where({ id });
  }

}