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
} from "@nextui-org/react"
import { FC } from "react"

interface DeleteModalProps {
  id: number
}

export const DeleteModal: FC<DeleteModalProps> = ({ id }) => {
  const { 
    isOpen, 
    onOpen, 
    onOpenChange, 
    onSubmit 
  } = useDestroyStock(id)

  return (
    <>
      <ButtonModalTrigger
        classNames={{
          text: "hidden md:inline-block"
        }}
        onClick={onOpen}
        icon={<TrashIcon className="size-5 text-red-500 hover:fill-red-200" />}
        text="Editar"
        isAction={true}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="xl">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4 className="text-lg font-semibold">¿Estás seguro de eliminar este material?</h4>
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