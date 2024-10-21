'use client'

import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { DataUserType } from "@/interfaces/UserData"
import { useUpdateUser } from "@/hooks"
import { FC } from "react"

interface UpdateUserFormProps {
  onClose: () => void;
  data: DataUserType;
}

export const UpdateUserForm: FC<UpdateUserFormProps> = ({
  onClose,
  data
}) => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useUpdateUser(data, onClose)

  return (
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
  )
}