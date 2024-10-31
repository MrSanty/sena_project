'use server'

import prisma from "@/lib/prisma"

export const getProcess = async (search: string) => {
  try {
    const processes = await prisma.production.findMany({
      include: {
        product: {
          select: {
            name: true,
            prod_time: true,
            id: true
          }
        }
      },
      where: {
        name: {
          contains: search,
          mode: "insensitive"
        }
      }
    })
    return processes
  } catch (error) {
    
  }
}