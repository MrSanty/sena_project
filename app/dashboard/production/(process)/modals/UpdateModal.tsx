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
import { UpdateOrderForm } from "../forms/UpdateOrderForm"
import { useQuery } from "@tanstack/react-query"
import { getStock } from "@/actions"
import toast from "react-hot-toast"
import { getProducts } from "@/actions/product/getProducts"

interface UpdateModalProps {
  className?: string;
  data: any;
}

export const UpdateModal: FC<UpdateModalProps> = ({
  className,
  data,
}) => {
  const { data: products, isLoading } = useQuery({
    queryKey: [ "products" ],
    queryFn: async () => {
      try {
        const data = await getProducts(1, "")
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
          text: "hidden md:inline-block"
        }}
        onClick={onOpen}
        icon={<PencilIcon className="size-5 text-default-400 hover:fill-default-200" />}
        text="Editar"
        isAction={true}
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
                <UpdateOrderForm
                  products={products || []}
                  process={data}
                  onClose={onOpenChange}
                />
              )
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}