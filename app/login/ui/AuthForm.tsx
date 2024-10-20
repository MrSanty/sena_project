'use client'
import { EyeSlashIcon } from "@/components/icons/EyeSlashIcon"
import { SubmitHandler, useForm } from "react-hook-form"
import { loginSchema } from "@/validation/loginSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormAuthData } from "@/interfaces/LoginData"
import { EyeIcon } from "@/components/icons/EyeIcon"
import { Button, Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import { login } from "@/actions/auth/login"


export const AuthForm = () => {
  const [ isVisible, setIsVisible ] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormAuthData>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<FormAuthData> = async ({ email, password }) => {
    toast.loading('Iniciando sesión...', { id: 'login' })
    const loggedIn = await login(email, password)
    if (loggedIn) {
      toast.dismiss('login')
      toast.success('Sesión iniciada correctamente')
    } else {
      toast.dismiss('login')
      toast.error('Credenciales incorrectas')
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="flex flex-col gap-5">
        <Input
          {...register("email")}
          label="Correo electrónico"
          labelPlacement="outside"
          type="email"
          variant="bordered"
          radius="sm"
          placeholder="Ingresa tu correo electrónico"
          errorMessage={errors.email ? errors.email.message : ''}
          isInvalid={errors.email ? true : false}
        />
        <Input
          {...register("password")}
          label="Contraseña"
          labelPlacement="outside"
          type={isVisible ? "text" : "password"}
          variant="bordered"
          radius="sm"
          placeholder="Ingresa tu contraseña"
          isInvalid={errors.password ? true : false}
          errorMessage={errors.password ? errors.password.message : ''}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeSlashIcon className="size-5 text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="size-5 text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
      </div>
      <div className="flex items-center justify-end">
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-zinc-900 hover:text-zinc-900/90"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
      <div>
        <Button
          type="submit"
          
          className="w-full bg-zinc-900 text-white"
        >
          Iniciar sesión
        </Button>
      </div>
    </form>
  )
}