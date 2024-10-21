'use server'

import prisma from "@/lib/prisma"

export const destroyUser = async (id: number) => {
  try {
    const user = await prisma.users.delete({
      where: {
        id: id
      }
    })

    return true
  } catch (error: any) {
    throw new Error(error)
  }
}