'use client'

import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { useForm, useFieldArray } from "react-hook-form"
import { FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStock } from "@/actions";
import toast from "react-hot-toast";
import { TrashIcon } from "@/components/icons";
import { addProduct } from "@/actions/product/addProduct";

interface CreateProductFormProps {
  company_id: number;
  onClose: () => void;
}

export const CreateProductForm: FC<CreateProductFormProps> = ({
  company_id,
  onClose
}) => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, control, formState: { errors } } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stock"
  })

  const onSubmit = (data: any) => {
    toast.loading("Agregando producto...", { id: "addProduct" })
    mutate(data)
  }

  const { data, isLoading } = useQuery({
    queryKey: [ "stock" ],
    queryFn: async () => {
      try {
        const data = await getStock(company_id, "")
        return data
      } catch (error) {
        toast.error("Error al obtener los datos")
        return []
      }
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      try {
        try {
          const product = await addProduct(data)
          return product
        } catch (error) {
          throw new Error(error as string)
        }
      } catch (error) {
        throw new Error(error as string)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ "products" ],
      })

      toast.dismiss("addProduct")
      toast.success("Producto agregado correctamente")
      onClose()
    },
    onError: () => {
      toast.dismiss("addProduct")
      toast.error("Ocurrió un error al agregar el producto")
    }
  })

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <Input
          {...register("product_name", { required: "Nombre del producto es requerido" })}
          label="Nombre del Producto"
          labelPlacement="outside"
          type="text"
          variant="bordered"
          radius="sm"
          placeholder="Ingresa el nombre del producto"
          isInvalid={!!errors.product_name}
        />
        <Input
          {...register("production_time", { required: "Tiempo de producción es requerido" })}
          label="Tiempo de Producción (minutos)"
          labelPlacement="outside"
          type="number"
          variant="bordered"
          radius="sm"
          placeholder="Ingresa el tiempo de producción"
          isInvalid={!!errors.production_time}
        />
      </div>
      <div className="space-y-4">
        {fields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-3 gap-2 items-end">
            <Select
              {...register(`stock.${index}.product_id`, { required: "Elemento es requerido" })}
              label="Material"
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              placeholder="Selecciona un material"
            >
              {
                data?.map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                )) || []
              }
            </Select>
            <Input
              {...register(`stock.${index}.quantity`, { required: "Cantidad es requerida" })}
              label="Cantidad"
              labelPlacement="outside"
              type="number"
              variant="bordered"
              radius="sm"
              placeholder="Ingresa la cantidad"
            />
            <Button
              color="danger"
              variant="light"
              size="sm"
              onClick={() => remove(index)}
              className="mb-1"
            >
              <TrashIcon className="size-4" />
            </Button>
          </div>
        ))}
        <Button
          onClick={() => append({ product_id: "", quantity: "" })}
          variant="light"
          size="sm"
        >
          + Agregar Material
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Button size="sm" color="danger" variant="light" onPress={onClose}>
          Cancelar
        </Button>
        <Button size="sm" className="bg-zinc-900 text-white" type="submit">
          Guardar Producto
        </Button>
      </div>
    </form>
  )
}
