'use client'

import { ButtonModalTrigger } from "@/components/ui/ButtonModalTrigger"
import { UpdateStockForm } from "../forms/UpdateStockForm"
import { DataStockType } from "@/interfaces/StockData"
import { PencilIcon } from "@/components/icons"
import { 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalHeader, 
  useDisclosure 
} from "@nextui-org/react"
import { FC } from "react"

interface UpdateModalProps {
  className?: string;
  data: DataStockType;
}

export const UpdateModal: FC<UpdateModalProps> = ({
  data
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <ButtonModalTrigger
        classNames={{
          text: "hidden md:inline-block"
        }}
        onClick={onOpen}
        icon={<PencilIcon className="size-5 text-default-400 hover:fill-default-200" />}
        text="Editar"
        isAction={true}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h4 className="text-lg font-semibold">Actualizar inventario</h4>
            <span className="text-sm text-gray-400">
              Actualiza los datos del inventario
            </span>
          </ModalHeader>
          <ModalBody>
            <UpdateStockForm onClose={onOpenChange} data={data} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}