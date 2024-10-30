'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDisclosure } from "@nextui-org/react"
import { destroyStock } from "@/actions"
import toast from "react-hot-toast"

export const useDestroyStock = (id: number) => {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const response = await destroyStock(id)
        return response
      } catch (error) {
        toast.dismiss("destroyStock")
        toast.error("Error al eliminar el material")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["stock"]
      })

      toast.dismiss("destroyStock")
      toast.success("Material eliminado correctamente")
      onOpenChange()
    }
  })

  const onSubmit = async () => {
    toast.loading("Eliminando material...", {
      id: "destroyStock"
    })
    mutate()
  }

  return { isOpen, onOpen, onOpenChange, onSubmit }
}