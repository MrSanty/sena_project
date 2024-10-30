'use client'

import { CreateFormStock, DataStockType } from "@/interfaces/StockData"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { stockSchema } from "@/validation/stockSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { updateStock } from "@/actions"
import toast from "react-hot-toast"

export const useUpdateStock = (data: DataStockType, onClose: () => void) => {
  const queryClient = useQueryClient()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateFormStock>({
    resolver: yupResolver(stockSchema),
    defaultValues: {
      code: data.code,
      name: data.name,
      unit_type: data.unit_type,
      quantity: `${data.quantity}`,
      description: data.description || ""
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (formData: CreateFormStock) => { 
      try {
        const response = await updateStock({
          id: data.id,
          ...formData
        })
        return response
      } catch (error) {
        toast.dismiss("updateStock")
        toast.error("Error al actualizar el material")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["stock"]
      })

      toast.dismiss("updateStock")
      toast.success("Material actualizado correctamente")
      onClose()
    }
  })

  const onSubmit: SubmitHandler<CreateFormStock> = ({
    code,
    name,
    description,
    quantity,
    unit_type
  }) => {
    toast.loading("Actualizando inventario...", { id: "updateStock" })
    mutate({
      code,
      name,
      description,
      quantity,
      unit_type
    })
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  }
}