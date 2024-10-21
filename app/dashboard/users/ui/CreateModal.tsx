'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateFormUser, CreateUserServer } from "@/interfaces/UserData"
import { yupResolver } from "@hookform/resolvers/yup"
import { userSchema } from "@/validation/userSchema"
import { addUsers } from "@/actions/user/addUsers"
import { PlusIcon } from "@/components/icons"
import toast from "react-hot-toast"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem
} from "@nextui-org/react"
import { FC } from "react"

interface CreateModalProps {
  className?: string;
  company_id: number;
}

export const CreateModal: FC<CreateModalProps> = ({
  className,
  company_id
}) => {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateFormUser>({
    resolver: yupResolver(userSchema)
  })

  const { mutate } = useMutation({
    mutationFn: async (data: CreateUserServer) => {
      const response = await addUsers(data)
      return response
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ "users" ]
      })

      toast.dismiss("addUser")
      toast.success("Usuario agregado correctamente")
      onOpenChange()
    },
    onError: () => {
      toast.dismiss("addUser")
      toast.error("Error al agregar el usuario")
    }
  })

  const onSubmit: SubmitHandler<CreateFormUser> = async ({
    first_name,
    last_name,
    email,
    password,
    type_doc,
    num_doc
  }) => {
    toast.loading("Agregando usuario...", { id: "addUser" })
    mutate({
      first_name,
      last_name,
      email,
      password,
      type_doc,
      num_doc,
      company_id: company_id,
      user_roles: [ 1 ],
      user_permissions: []
    })
  }

  return (
    <>
      <Button
        size="sm"
        className={`flex items-center gap-1 min-w-fit bg-zinc-900 text-white ${className}`}
        onClick={onOpen}
      >
        <PlusIcon className="size-4" />
        <span className="hidden md:inline-block">Agregar</span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="xl">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4 className="text-lg font-semibold">Agregar usuario</h4>
                <span className="text-sm text-gray-400">
                  Ingresa un nuevo usuario
                </span>
              </ModalHeader>
              <ModalBody>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  >
                    <Select
                      {...register("type_doc")}
                      label="Tipo de documento"
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      placeholder="Selecciona un tipo de documento"
                      isInvalid={errors.type_doc ? true : false}
                      errorMessage={errors.type_doc ? errors.type_doc.message : ''}
                    >
                      <SelectItem key="CC" value="CC">
                        Cédula de ciudadanía
                      </SelectItem>
                      <SelectItem key="CE" value="CE">
                        Cédula de extranjería
                      </SelectItem>
                      <SelectItem key="TI" value="TI">
                        Tarjeta de identidad
                      </SelectItem>
                      <SelectItem key="PPT" value="PPT">
                        Permiso provisional de trabajo
                      </SelectItem>
                      <SelectItem key="PST" value="PST">
                        Permiso de permanencia
                      </SelectItem>
                    </Select>
                    <Input
                      {...register("num_doc")}
                      label="Número de documento"
                      labelPlacement="outside"
                      type="text"
                      variant="bordered"
                      radius="sm"
                      placeholder="Ingresa el número de documento"
                      isInvalid={errors.num_doc ? true : false}
                      errorMessage={errors.num_doc ? errors.num_doc.message : ''}
                    />
                    <Input
                      {...register("email")}
                      label="Correo electrónico"
                      labelPlacement="outside"
                      type="email"
                      variant="bordered"
                      radius="sm"
                      placeholder="Ingresa el correo electrónico"
                      isInvalid={errors.email ? true : false}
                      errorMessage={errors.email ? errors.email.message : ''}
                    />
                    <Input
                      {...register("first_name")}
                      label="Primer nombre"
                      labelPlacement="outside"
                      type="text"
                      variant="bordered"
                      radius="sm"
                      placeholder="Ingresa el primer nombre"
                      isInvalid={errors.first_name ? true : false}
                      errorMessage={errors.first_name ? errors.first_name.message : ''}
                    />
                    <Input
                      {...register("last_name")}
                      label="Apellido"
                      labelPlacement="outside"
                      type="text"
                      variant="bordered"
                      radius="sm"
                      placeholder="Ingresa el apellido"
                      isInvalid={errors.last_name ? true : false}
                      errorMessage={errors.last_name ? errors.last_name.message : ''}
                    />
                    <Input
                      {...register("password")}
                      label="Contraseña"
                      labelPlacement="outside"
                      type="text"
                      variant="bordered"
                      radius="sm"
                      placeholder="Ingresa la contraseña"
                      isInvalid={errors.password ? true : false}
                      errorMessage={errors.password ? errors.password.message : ''}
                    />
                  </div>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  >
                    <Button size="sm" color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button size="sm" className="bg-zinc-900 text-white" type="submit">
                      Guardar
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}