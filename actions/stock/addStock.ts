'use server'

import prisma from "@/lib/prisma"
import { CreateStockServer } from '@/interfaces/StockData'

export const addStock = async (data: CreateStockServer) => {
  try {
    const { 
      code, 
      name, 
      description, 
      quantity, 
      unit_type, 
      company_id 
    } = data

    const newStock = await prisma.stock.create({
      data: {
        code,
        name,
        description,
        quantity: parseInt(quantity),
        unit_type,
        company_id: data.company_id,
      }
    })

    return true
  } catch (error: any) {
    throw new Error(error)
  }
}