'use server'

import prisma from "@/lib/prisma"

export const getStock = async (companyId: number) => {
  try {
    const stock = await prisma.stock.findMany({
      where: {
        company_id: companyId
      }
    })

    return stock
  } catch (error: any) {
    throw new Error(error)
  }
}