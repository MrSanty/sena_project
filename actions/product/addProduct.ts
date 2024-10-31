'use server'

import prisma from "@/lib/prisma"
import { parse } from "path"


export const addProduct = async (data: any) => {
  try {
    const product = await prisma.products.create({
      data: {
        name: data.product_name,
        prod_time: parseInt(data.production_time),
        product_stocks: {
          createMany: {
            data: data.stock.map((stock: any) => ({
              stock_id: parseInt(stock.product_id),
              quantity: parseInt(stock.quantity)
            }))
          }
        }
      }
    })
    return product
  } catch (error) {
    console.error(error)
    return null
  }
}