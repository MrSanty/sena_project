'use client'

import { SearchIcon, TimeIcon } from "@/components/icons"
import { Accordion, AccordionItem, Input, Spinner } from "@nextui-org/react"
import { FC, useEffect, useState } from "react"
import { CreateModal } from "./modals/CreateModal"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/actions/product/getProducts"
import toast from "react-hot-toast"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { UpdateModal } from "./modals/UpdateModal"
import { DeleteModal } from "./modals/DeleteModal"

interface ProductsProps {
  company_id: number;
}

export const Products: FC<ProductsProps> = ({
  company_id
}) => {
  const [ search, setSearch ] = useState("")

  const onSearchChange = (value: string) => {
    setSearch(value)
  }

  const onClear = () => {
    setSearch("")
  }

  useEffect(() => {
    refetch()
  }, [ search ])

  const { data, isLoading, refetch } = useQuery({
    queryKey: [ "products", { search } ],
    queryFn: async () => {
      try {
        const data = await getProducts(company_id, search)
        return data
      } catch (error) {
        toast.error("Error al obtener los datos")
        return []
      }
    }
  })

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-start flex-col sm:flex-row sm:items-center gap-1">
          <Input
            isClearable
            className="w-full"
            variant="bordered"
            placeholder="Buscar un producto"
            size="sm"
            startContent={<SearchIcon className="size-4" />}
            value={search}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>

        <CreateModal
          company_id={company_id}
          className="hidden sm:flex"
        />
      </div>
      <div className="overflow-x-auto min-h-80 rounded-md">
        {
          isLoading && (
            <div className="flex justify-center items-center h-60">
              <Spinner color="primary" size="md" label="Cargando..." />
            </div>
          )
        }

        {
          !isLoading && data?.length === 0 && (
            <div className="flex justify-center items-center h-80">
              <h4 className="text-lg text-gray-400">No hay productos</h4>
            </div>
          )
        }

        {
          !isLoading && data?.length! > 0 && (
            <Accordion variant="splitted" className="flex flex-col gap-2 w-full">
              {
                data?.map((product: any) => (
                  <AccordionItem
                    key={product.id}
                    title={
                      <div className="flex justify-between items-center">
                        <h1>
                          {product.name}
                        </h1>

                        <div className="flex items-center gap-1">
                          <TimeIcon className="size-6" />
                          <span className="text-sm">{product.prod_time} min</span>
                        </div>
                      </div>
                    }
                    subtitle={
                      <span>Ultima actualización: <strong>{format(new Date(product.updated_at), "dd 'de' MMMM 'de' yyyy", { locale: es })}</strong></span>
                    }
                    className="pb-4"
                  >
                    <div className="flex flex-col gap-2">
                      {
                        product.product_stocks.map((stock: any) => (
                          <div key={stock.stock.id} className="flex justify-between items-center">
                            <div>
                              <h2 className="text-md">{stock.stock.name}</h2>
                              <span className="text-sm text-gray-400">{stock.stock.unit_type}</span>
                            </div>
                            <div>
                              <span className="text-md">{stock.quantity}</span>
                            </div>
                          </div>
                        ))
                      }
                      <div className="flex justify-end gap-2">
                        <UpdateModal data={product} />
                        <DeleteModal id={product.id} />
                      </div>
                    </div>
                  </AccordionItem>

                )) || []
              }
            </Accordion>
          )
        }
      </div>
    </>
  )
}