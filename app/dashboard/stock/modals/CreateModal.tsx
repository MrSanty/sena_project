'use client'

import { ButtonModalTrigger } from "@/components/ui/ButtonModalTrigger"
import { CreateStockForm } from "../forms/CreateStockForm"
import { PlusIcon } from "@/components/icons"
import { 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalHeader, 
  useDisclosure 
} from "@nextui-org/react"
import { FC } from "react"

interface CreateModalProps {
  className?: string;
  company_id: number;
}

export const CreateModal: FC<CreateModalProps> = ({
  className,
  company_id
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <ButtonModalTrigger
        classNames={{
          button: `flex items-center gap-1 min-w-fit bg-zinc-900 text-white ${className}`,
          text: "hidden md:inline-block"
        }}
        onClick={onOpen}
        icon={<PlusIcon className="size-4" />}
        text="Agregar"
        isAction={false}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h4 className="text-lg font-semibold">Agregar producto</h4>
            <span className="text-sm text-gray-400">
              Ingresa un nuevo producto
            </span>
          </ModalHeader>
          <ModalBody>
            <CreateStockForm onClose={onOpenChange} company_id={company_id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}