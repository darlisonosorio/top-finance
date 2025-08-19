import { FinanceForm } from "./finance-form";

export interface ListFinanceResult {
    data: FinanceForm[];
    meta: {
        page: number;
        limit: number;
        total: number; 
        totalPages: number;
    }
}


export class ListFinance {
  id: number;
  user_id: number;
  value: string;
  description: string;
}