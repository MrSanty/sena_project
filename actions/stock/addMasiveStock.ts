'use server'

import { CreateMultipleStockServer } from '@/interfaces/StockData'
import prisma from "@/lib/prisma"

export const addMasiveStock = async (data: CreateMultipleStockServer[]) => {
  try {
    if (data.length === 0) {
      return false
    }

    await prisma.stock.createMany({
      data: data
    })

    return true
  } catch (error: any) {
    throw new Error(error)
  }
}