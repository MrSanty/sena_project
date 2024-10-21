'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "@/actions/user/updateUser"
import { userEditSchema } from "@/validation/userSchema"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { PencilIcon } from "@/components/icons"
import { FC, useEffect } from "react"
import toast from "react-hot-toast"
import { 
  UpdateFormUser, 
  DataUserType, 
  UpdateUserServer 
} from "@/interfaces/UserData"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Tooltip
} from "@nextui-org/react"

interface EditModalProps {
  data: DataUserType
}

export const EditModal: FC<EditModalProps> = ({ data }) => {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<UpdateFormUser>({
    resolver: yupResolver(userEditSchema)
  })

  useEffect(() => {
    setValue('first_name', data.first_name || '')
    setValue('last_name', data.last_name || '')
    setValue('email', data.email)
    setValue('type_doc', data.type_doc)
    setValue('num_doc', data.num_doc)
  }, [ data ])

  const { mutate } = useMutation({
    mutationFn: async (data: UpdateUserServer) => {
      try {
        const response = await updateUser(data)
        return response
      } catch (error) {
        toast.dismiss("updateUser")
        toast.error("Error al actualizar el usuario")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"]
      })

      toast.dismiss("updateUser")
      toast.success("Usuario actualizado correctamente")
      onOpenChange()
    }
  })

  const onSubmit: SubmitHandler<UpdateFormUser> = ({
    first_name,
    last_name,
    email,
    type_doc,
    num_doc
  }) => {
    toast.loading("Actualizando usuario...", { id: "updateUser" })
    mutate({
      first_name,
      last_name,
      email,
      type_doc,
      num_doc,
      id: data.id
    })
  }

  return (
    <>
      <Tooltip content="Editar" color="foreground" placement="top">
        <button
          onClick={onOpen}
        >
          <PencilIcon className="size-5 text-default-400 hover:fill-default-200" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="xl">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4 className="text-lg font-semibold">Editar producto</h4>
                <span className="text-sm text-gray-400">
                  Actualiza el producto
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
                  </div>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  >
                    <Button size="sm" color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button size="sm" className="bg-zinc-900 text-white" type="submit">
                      Actualizar
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