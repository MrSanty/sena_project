'use server'

import prisma from "@/lib/prisma"

export const addProcess = async (data: any) => {
  try {
    const process = await prisma.production.create({
      data: {
        name: data.order_name,
        quantity: parseInt(data.quantity),
        status: "Proceso",
        product_id: parseInt(data.product),
        estimated_time: data.prod_time * data.quantity
      }
    })

    return process
    
  } catch (error) {
    throw new Error(error as string)
  }
}