'use server'

import prisma from "@/lib/prisma"

export const destroyProcess = async (id: number) => {
  try {
    console.log(id)
    const process = await prisma.production.delete({
      where: {
        id: id
      }
    })
    return process
  } catch (error) {
    throw new Error(error as string)
  }
}