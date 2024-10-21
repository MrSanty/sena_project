'use client'

import { EyeIcon, EyeSlashIcon } from "@/components/icons"
import { Button, Input } from "@nextui-org/react"
import { useLogin } from "@/hooks"

export const AuthForm = () => {
  const {
    isVisible,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    toggleVisibility
  } = useLogin()

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
          isLoading={isSubmitting}
          className="w-full bg-zinc-900 text-white"
        >
          Iniciar sesión
        </Button>
      </div>
    </form>
  )
}