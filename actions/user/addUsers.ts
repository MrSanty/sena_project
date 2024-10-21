'use server'

import { CreateUserServer } from "@/interfaces/UserData"
import { TypeDoc } from "@prisma/client"
import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export const addUsers = async (data: CreateUserServer) => {
  try {
    const {
      type_doc,
      num_doc,
      email,
      first_name,
      last_name,
      password,
      company_id,
      user_roles,
      user_permissions
    } = data

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.users.create({
      data: {
        type_doc: type_doc as TypeDoc,
        num_doc,
        email,
        first_name,
        last_name,
        password: hashedPassword,
        company_id,
        user_roles: {
          createMany: {
            data: user_roles.map((role) => {
              return {
                role_id: role
              }
            })
          },
        },
        user_permissions: user_permissions.length > 0 ? {
          createMany: {
            data: user_permissions.map((permission) => {
              return {
                permission_id: permission
              }
            })
          },
        } : undefined,
      },
    })

    return true
  } catch (error: any) {
    throw new Error(error)
  }
}