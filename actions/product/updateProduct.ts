'use server'

import prisma from "@/lib/prisma"

export const updateProduct = async (data: any) => {
  try {
    const { product_id, product_name, production_time, stock } = data

    const product = await prisma.products.update({
      where: {
        id: product_id
      },
      data: {
        name: product_name,
        prod_time: parseInt(production_time),
        product_stocks: {
          deleteMany: {},
          create: stock.map((s: any) => ({
            quantity: parseInt(s.quantity),
            stock_id: parseInt(s.product_id)
          }))
        }
      }
    })

    return product
  } catch (error) {
    console.error(error)
    return null
  }
}