import { UnitType } from "@prisma/client";

export interface DataStockType {
  id: number;
  code: string;
  name: string;
  description: string | null;
  quantity: number;
  unit_type: UnitType;
  company_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateFormStock {
  code: string;
  name: string;
  description: string;
  quantity: string;
  unit_type: UnitType;
}

export type CreateStockServer = CreateFormStock & {
  company_id: number;
}

export type CreateMultipleStockServer = CreateFormStock & {
  company_id: number;
  quantity: number;
}

export type UpdateStockServer = CreateFormStock & {
  id: number;
}