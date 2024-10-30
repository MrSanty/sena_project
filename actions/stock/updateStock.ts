'use server'

import { CreateFormStock, DataStockType, UpdateStockServer } from "@/interfaces/StockData"
import prisma from "@/lib/prisma"

export const updateStock = async (data: UpdateStockServer) => {
  try {
    const {
      id,
      code,
      name,
      description,
      quantity,
      unit_type
    } = data

    const stock = await prisma.stock.findUnique({
      where: {
        id: id
      }
    })

    if (!stock) {
      throw new Error('El stock no existe')
    }

    const updatedStock = await prisma.stock.update({
      where: {
        id: id
      },
      data: {
        code,
        name,
        description,
        quantity: parseInt(quantity),
        unit_type
      }
    })

    return true
  } catch (error: any) {
    throw new Error(error)
  }
}