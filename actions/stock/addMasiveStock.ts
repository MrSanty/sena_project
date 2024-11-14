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
  // Invalid value for argument `unit_type`
    if (error.message.includes('Duplicate entry')) {
      throw new Error('Hay productos duplicados')
    } else if (error.message.includes('missing')) {
      throw new Error('Faltan campos obligatorios')
    } else if (error.message.includes('Invalid value')) {
      throw new Error('Valor inválido para el campo tipo de unidad')
    } else {
      throw new Error('Error al guardar los productos')
    }
  }
}