'use client'

import { CreateUserForm } from "@/app/dashboard/users/forms/CreateUserForm"
import { ButtonModalTrigger } from "@/components/ui/ButtonModalTrigger"
import { PencilIcon, PlusIcon } from "@/components/icons"
import { 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalHeader, 
  Spinner, 
  useDisclosure 
} from "@nextui-org/react"
import { FC } from "react"
import { CreateProductForm } from "../forms/CreateProductForm"
import { UpdateProductForm } from "../forms/UpdateProductForm"
import { useQuery } from "@tanstack/react-query"
import { getStock } from "@/actions"
import toast from "react-hot-toast"

interface UpdateModalProps {
  className?: string;
  data: any;
}

export const UpdateModal: FC<UpdateModalProps> = ({
  className,
  data,
}) => {
  const { data: stocks, isLoading } = useQuery({
    queryKey: [ "stock" ],
    queryFn: async () => {
      try {
        const data = await getStock(1, "")
        return data
      } catch (error) {
        toast.error("Error al obtener los datos")
        return []
      }
    }
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <ButtonModalTrigger
        classNames={{
          button: `flex items-center gap-1 min-w-fit bg-transparent border-zinc-500 border-2 text-zinc-900 ${className}`,
          text: "hidden md:inline-block"
        }}
        onClick={onOpen}
        icon={<PencilIcon className="m-0 sm:mr-1 size-4" />}
        text="Editar"
        isAction={false}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h4 className="text-lg font-semibold">Actualizar producto</h4>
            <span className="text-sm text-gray-400">
              Actualiza un producto
            </span>
          </ModalHeader>
          <ModalBody>
            {
              isLoading ? (
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <UpdateProductForm
                  product={data}
                  onClose={onOpenChange}
                  stocks={stocks}
                />
              )
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}