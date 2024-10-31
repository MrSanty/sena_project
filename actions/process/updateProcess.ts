'use server'

import prisma from "@/lib/prisma"
import { parse } from "path"

export const updateProcess = async (id: number, data: any) => {
  try {
    console.log(id)
    const process = await prisma.production.update({
      where: {
        id: id
      },
      data: {
        name: data.order_name,
        quantity: parseInt(data.quantity),
        status: data.status
      }
    })
    return process
  } catch (error) {
    throw new Error(error as string)
  }
}