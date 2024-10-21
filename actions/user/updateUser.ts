'use server'

import { UpdateUserServer } from "@/interfaces/UserData"
import { TypeDoc } from "@prisma/client"
import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export const updateUser = async (data: UpdateUserServer) => {
  try {
    const {
      id,
      type_doc,
      num_doc,
      email,
      first_name,
      last_name,
    } = data

    const user = await prisma.users.findUnique({
      where: {
        id: id
      }
    })

    if (!user) {
      throw new Error('El usuario no existe')
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: id
      },
      data: {
        type_doc: type_doc as TypeDoc,
        num_doc,
        email,
        first_name,
        last_name
      }
    })

    return true
  } catch (error: any) {
    throw new Error(error)
  }
}