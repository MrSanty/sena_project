'use client'

import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/actions/product/getProducts";
import toast from "react-hot-toast";
import { addProduct } from "@/actions/product/addProduct";
import { addProcess } from "@/actions/process/addProcess";
import { Products } from '../../(products)/Products';
import { updateProcess } from "@/actions/process/updateProcess";

interface UpdateOrderFormProps {
  process: any;
  onClose: () => void;
  products: any[];
}

export const UpdateOrderForm: FC<UpdateOrderFormProps> = ({ 
  process, 
  onClose,
  products
}) => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      order_name: process.name,
      quantity: process.quantity,
      status: process.status
    }
  })

  const onSubmit = (data: any) => {
    toast.loading("Agregando orden...", { id: "addProcess" })
    mutate({
      id: data.id,
      order_name: data.order_name,
      quantity: data.quantity,
      status: data.status
    })
    
  }

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const product = await updateProcess(process.id, {
          order_name: data.order_name,
          quantity: data.quantity,
          status: data.status
        })
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
    onError: () => {
      toast.dismiss("addProcess")
      toast.error("Ocurrió un error al agregar la orden")
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
        {/* <Select
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
        </Select> */}
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
        <Select
          {...register("status", { required: "El estado es requerido" })}
          label="Estado"
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          placeholder="Selecciona un estado"
        >
          <SelectItem key="Proceso" value="Proceso">
            Proceso
          </SelectItem>
          <SelectItem key="Retrasado" value="Retrasado">
            Retrasado
          </SelectItem>
          <SelectItem key="Suspendido" value="Suspendido">
            Suspendido
          </SelectItem>
          <SelectItem key="Problema" value="Problema">
            Problema
          </SelectItem>
          <SelectItem key="Finalizado" value="Finalizado">
            Finalizado
          </SelectItem>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-5">
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
