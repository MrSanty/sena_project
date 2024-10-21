'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { loginSchema } from "@/validation/loginSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormAuthData } from "@/interfaces/LoginData"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { login } from "@/actions"
import { useState } from "react"

export const useLogin = () => {
  const [ isVisible, setIsVisible ] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormAuthData>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<FormAuthData> = async ({ email, password }) => {
    toast.loading('Iniciando sesión...', { id: 'login' })
    const loggedIn = await login(email, password)
    if (loggedIn) {
      toast.dismiss('login')
      toast.success('Sesión iniciada correctamente')
      router.push('/dashboard')
    } else {
      toast.dismiss('login')
      toast.error('Credenciales incorrectas')
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return {
    isVisible,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    toggleVisibility
  }
}