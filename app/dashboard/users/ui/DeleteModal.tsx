'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { destroyUser } from "@/actions/user/destroyUser"
import { TrashIcon } from "@/components/icons"
import toast from "react-hot-toast"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip
} from "@nextui-org/react"
import { FC } from "react"

interface DeleteModalProps {
  id: number
}

export const DeleteModal: FC<DeleteModalProps> = ({ id }) => {
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

  return (
    <>
      <Tooltip
        content="Eliminar"
        color="danger"
        placement="top"
      >
        <button
          onClick={onOpen}
        >
          <TrashIcon className="size-5 text-red-500 hover:fill-red-200" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="xl">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4 className="text-lg font-semibold">¿Estás seguro de eliminar este usuario?</h4>
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
  );
}