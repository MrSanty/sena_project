'use server'

import prisma from "@/lib/prisma"

export const addProcess = async (data: any) => {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: parseInt(data.product)
      },
      include: {
        product_stocks: {
          include: {
            stock: true
          }
        },
      }
    })

    if (!product) {
      throw new Error("Producto no encontrado")
    }

    const ingredients = product.product_stocks.map((prod) => {
      return {
        id: prod.stock.id,
        quantity: prod.quantity * parseInt(data.quantity)
      }
    })

    const stocks = await prisma.stock.findMany({
      where: {
        id: {
          in: ingredients.map((ing) => ing.id)
        }
      }
    })

    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].quantity < ingredients[i].quantity) {
        throw new Error(`No hay suficiente stock para el producto ${stocks[i].name}`)
      }
    }

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
    
  } catch (error: any) {
    if (error.message.includes('Producto no encontrado')) {
      throw new Error('Producto no encontrado')
    } else if (error.message.includes('No hay suficiente stock')) { 
      throw new Error('No hay suficiente stock')
    } else {
      throw new Error('Error al guardar el proceso')
    }
  }
}