'use server'

import prisma from "@/lib/prisma"

export const destroyStock = async (id: number) => {
  try {
    const stock = await prisma.stock.delete({
      where: {
        id: id
      }
    })

    return true
  } catch (error: any) {
    throw new Error(error)
  }
}