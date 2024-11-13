'use server'

import prisma from "@/lib/prisma"

export const getProcess = async (search: string, status: string) => {
  try {
    let filters = {}

    if (!status) {
      filters = {
        name: {
          contains: search,
          mode: "insensitive"
        }
      }
    } else {
      filters = {
        name: {
          contains: search,
          mode: "insensitive"
        },
        status: {
          equals: status
        }
      }
    }

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
      where: filters
    })
    return processes
  } catch (error) {
    
  }
}