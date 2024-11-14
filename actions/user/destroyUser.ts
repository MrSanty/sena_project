'use server'

import prisma from "@/lib/prisma"

export const destroyUser = async (id: number) => {
  try {
    const existUser = await prisma.users.findFirst({
      where: {
        id: id
      }
    })

    if (!existUser) {
      throw new Error('El usuario no existe')
    }

    const user = await prisma.users.delete({
      where: {
        id: id
      }
    })

    return true
  } catch (error: any) {
    if (error.message.includes('El usuario no existe')) {
      throw new Error(error.message)
    } else {
      throw new Error('Error al eliminar el usuario')
    }
  }
}