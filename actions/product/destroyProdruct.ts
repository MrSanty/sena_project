'use server'

import prisma from "@/lib/prisma"


export const destroyProduct = async (id: number) => {
  try {
    const product = await prisma.products.delete({
      where: {
        id
      }
    })

    return product
  } catch (error) {
    console.error(error)
    return null
  }
}