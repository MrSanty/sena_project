'use server'

import { signIn } from "@/auth"

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    return true
  } catch (error) {
    return false
  }
}