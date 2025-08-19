import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('finance').del();

  await knex('finance').insert([
    {
      id: 1,
      user_id: 1,
      value: '500.00',
      description: 'Salário inicial',
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      user_id: 1,
      value: '-150.00',
      description: 'Compra supermercado',
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
