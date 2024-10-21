'use server'

import prisma from "@/lib/prisma"

export const getUsers = async (companyId: number) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        company_id: companyId
      },
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })

    return users
  } catch (error: any) {
    throw new Error(error)
  }
}