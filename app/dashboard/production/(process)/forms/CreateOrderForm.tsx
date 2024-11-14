'use client'

import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/actions/product/getProducts";
import toast from "react-hot-toast";
import { addProduct } from "@/actions/product/addProduct";
import { addProcess } from "@/actions/process/addProcess";

interface CreateOrderFormProps {
  onClose: () => void;
}

export const CreateOrderForm: FC<CreateOrderFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: any) => {
    const prod_time = products?.find(product => product.id === parseInt(data.product))?.prod_time
    toast.loading("Agregando orden...", { id: "addProcess" })
    mutate({ ...data, prod_time })
    
  }

  const { data: products, isLoading } = useQuery({
    queryKey: [ "process" ],
    queryFn: async () => {
      try {
        const data = await getProducts(1, "")
        return data
      } catch (error) {
        toast.error("Error al obtener los datos")
        return []
      }
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const product = await addProcess(data)
        return product
      } catch (error) {
        throw new Error(error as string)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ "process" ]
      })

      toast.dismiss("addProcess")
      toast.success("Orden agregada correctamente")
      onClose()
    },
    onError: (error: Error) => {
      toast.dismiss("addProcess")
      toast.error(error.message)
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
          {...register("order_name", { required: "El nombre de la orden es requerido" })}
          label="Nombre de la Orden"
          labelPlacement="outside"
          type="text"
          variant="bordered"
          radius="sm"
          placeholder="Ej: Orden #003"
          isInvalid={!!errors.order_name}
        />
        <Select
          {...register("product", { required: "El producto es requerido" })}
          label="Producto"
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          placeholder="Selecciona un producto"
          isInvalid={!!errors.product}
        >
          {products?.map(product => (
            <SelectItem key={product.id} value={product.id}>
              {product.name}
            </SelectItem>
          )) || []}
        </Select>
        <Input
          {...register("quantity", { required: "La cantidad es requerida", min: { value: 1, message: "La cantidad debe ser al menos 1" } })}
          label="Cantidad"
          labelPlacement="outside"
          type="number"
          variant="bordered"
          radius="sm"
          placeholder="Ingresa la cantidad"
          isInvalid={!!errors.quantity}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Button size="sm" color="danger" variant="light" onPress={onClose}>
          Cancelar
        </Button>
        <Button size="sm" className="bg-zinc-900 text-white" type="submit" isLoading={isPending}>
          Crear Orden
        </Button>
      </div>
    </form>
  )
}
