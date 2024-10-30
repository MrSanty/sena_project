'use client'

import { CreateFormStock, CreateStockServer } from "@/interfaces/StockData"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { stockSchema } from "@/validation/stockSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { addStock } from "@/actions"
import toast from "react-hot-toast"

export const useAddStock = (onClose: () => void, company_id: number) => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateFormStock>({
    resolver: yupResolver(stockSchema)
  })

  const { mutate } = useMutation({
    mutationFn: async (data: CreateStockServer) => {
      const response = await addStock(data)
      return response
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["stock"]
      })

      toast.dismiss("addStock")
      toast.success("Material agregado correctamente")
      onClose()
    },
    onError: () => {
      toast.dismiss("addStock")
      toast.error("Ocurrió un error al agregar el material")
    }
  })

  const onSubmit = async ({
    code,
    name,
    description,
    quantity,
    unit_type
  }: CreateFormStock) => {
    toast.loading("Agregando material...", { id: "addStock" })
    mutate({
      code,
      name,
      description,
      quantity,
      unit_type,
      company_id
    })
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  }
}