'use client'

import { ButtonModalTrigger } from "@/components/ui/ButtonModalTrigger"
import { TrashIcon } from "@/components/icons"
import { useDestroyStock } from "@/hooks"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"
import { FC } from "react"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { destroyProduct } from "@/actions/product/destroyProdruct"

interface DeleteModalProps {
  id: number
}

export const DeleteModal: FC<DeleteModalProps> = ({ id }) => {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const response = await destroyProduct(id)
        return response
      } catch (error) {
        toast.dismiss("destroyProduct")
        toast.error("Error al eliminar el producto")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ "products" ]
      })

      toast.dismiss("destroyProduct")
      toast.success("Producto eliminado correctamente")
      onOpenChange()
    }
  })

  const onSubmit = async () => {
    toast.loading("Eliminando producto...", {
      id: "destroyProduct"
    })
    mutate()
  }

  return (
    <>
      <ButtonModalTrigger
        classNames={{
          button: `flex items-center gap-1 min-w-fit bg-red-500 hover:bg-red-600 text-white`,
          text: "hidden md:inline-block"
        }}
        onClick={onOpen}
        icon={<TrashIcon className="m-0 sm:mr-1 size-4" />}
        text="Eliminar"
        isAction={false}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="xl">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4 className="text-lg font-semibold">¿Estás seguro de eliminar este producto?</h4>
                <span className="text-sm text-gray-700">
                  Esta acción no se puede deshacer
                </span>
              </ModalHeader>

              <ModalFooter>
                <Button
                  size="sm"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={onSubmit}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}