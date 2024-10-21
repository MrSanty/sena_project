'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDisclosure } from "@nextui-org/react"
import { destroyUser } from "@/actions"
import toast from "react-hot-toast"

export const useDestroyUser = (id: number) => {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const response = await destroyUser(id)
        return response
      } catch (error) {
        toast.dismiss("destroyUser")
        toast.error("Ocurrió un error al eliminar el usuario")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"]
      })

      toast.dismiss("destroyUser")
      toast.success("Usuario eliminado correctamente")
      onOpenChange()
    }
  })

  const onSubmit = async () => {
    toast.loading("Eliminando usuario...", {
      id: "destroyUser"
    })
    mutate()
  }

  return { isOpen, onOpen, onOpenChange, onSubmit }
}