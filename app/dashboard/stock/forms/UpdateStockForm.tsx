'use client'

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { DataStockType } from "@/interfaces/StockData"
import { useUpdateStock } from "@/hooks"
import { FC } from "react"

interface UpdateStockFormProps {
  onClose: () => void;
  data: DataStockType;
}

export const UpdateStockForm: FC<UpdateStockFormProps> = ({
  onClose,
  data
}) => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useUpdateStock(data, onClose)

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <Input
          {...register("code")}
          label="Código"
          labelPlacement="outside"
          type="text"
          variant="bordered"
          radius="sm"
          placeholder="Ingresa el código"
          isInvalid={errors.code ? true : false}
          errorMessage={errors.code ? errors.code.message : ''}
        />
        <Input
          {...register("name")}
          label="Nombre"
          labelPlacement="outside"
          type="text"
          variant="bordered"
          radius="sm"
          placeholder="Ingresa el nombre"
          isInvalid={errors.name ? true : false}
          errorMessage={errors.name ? errors.name.message : ''}
        />
        <Select
          {...register("unit_type")}
          label="Unidad de medida"
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          placeholder="Selecciona una unidad"
          isInvalid={errors.unit_type ? true : false}
          errorMessage={errors.unit_type ? errors.unit_type.message : ''}
        >
          <SelectItem key="unidad" value="Cantidad">
            Cantidad
          </SelectItem>
          <SelectItem key="kilogramo" value="Kilogramo">
            Kilogramo
          </SelectItem>
          <SelectItem key="litro" value="Litro">
            Litro
          </SelectItem>
          <SelectItem key="metro" value="Metro">
            Metro
          </SelectItem>
        </Select>
        <Input
          {...register("quantity")}
          label="Cantidad"
          labelPlacement="outside"
          type="number"
          variant="bordered"
          radius="sm"
          min={0}
          placeholder="Ingresa la cantidad"
          isInvalid={errors.quantity ? true : false}
          errorMessage={errors.quantity ? errors.quantity.message : ''}
        />
        <Textarea
          {...register("description")}
          label="Descripción"
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          minRows={1}
          maxRows={3}
          placeholder="Ingresa la descripción"
          isInvalid={errors.description ? true : false}
          errorMessage={errors.description ? errors.description.message : ''}
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
  )
}