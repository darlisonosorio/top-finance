export interface Finance {
  id: number;
  user_id: number;
  user_name?: string;
  value: string;
  description: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}