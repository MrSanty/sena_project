'use server'

import prisma from "@/lib/prisma"

export const getProducts = async (company_id: number, search: string) => {
  try {
    const products = await prisma.products.findMany({
      include: {
        product_stocks: {
          select: {
            quantity: true,
            stock_id: true,
            stock: {
              select: {
                name: true,
                id: true,
                unit_type: true
              }
            }
          }
        }
      },
      where: {
        name: {
          contains: search,
          mode: "insensitive"
        }
      },
    })

    return products
  } catch (error) {
    console.error(error)
    return null
  }
}