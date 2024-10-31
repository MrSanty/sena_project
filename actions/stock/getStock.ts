'use server'

import prisma from "@/lib/prisma"

export const getStock = async (companyId: number, search: string) => {
  try {
    const stock = await prisma.stock.findMany({
      where: {
        company_id: companyId,
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            description: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            code: {
              contains: search,
              mode: "insensitive"
            }
          }
        ]
      }
    })

    return stock
  } catch (error: any) {
    throw new Error(error)
  }
}