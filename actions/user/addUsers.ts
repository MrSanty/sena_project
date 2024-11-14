'use server'

import { CreateUserServer } from "@/interfaces/UserData"
import { TypeDoc } from "@prisma/client"
import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export const addUsers = async (data: CreateUserServer) => {
  try {
    const existUser = await prisma.users.findFirst({
      where: {
        OR: [
          {
            email: data.email
          },
          {
            num_doc: data.num_doc
          }
        ]
      }
    })


    if (existUser) {
      throw new Error('El correo o el número de documento ya se encuentra registrado')
    }

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

    await fetch('http://localhost:3000/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: newUser.email,
        company: 'Sena ERP',
        name: `${newUser.first_name} ${newUser.last_name}`
      })
    })

    return true
  } catch (error: any) {
    console.log(error.message)
    if (error.message.includes('password')) {
      throw new Error('La contraseña debe tener al menos 8 caracteres')
    } else if (error.message.includes('ya se encuentra registrado')) {
      throw new Error('El correo o el número de documento ya se encuentra registrado')
    } else {
      throw new Error('Ha ocurrido un error al agregar el usuario')
    }
  }
}