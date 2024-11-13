'use client'

import { UpdateModal } from "../modals/UpdateModal"
import { DeleteModal } from "../modals/DeleteModal"
import { CreateModal } from "../modals/CreateModal"
import { useQuery } from "@tanstack/react-query"
import { FC, useEffect, useState } from "react"
import { SearchIcon } from "@/components/icons"
import { UploadButton } from "./UploadButton"
import { getStock } from "@/actions"
import { es } from "date-fns/locale"
import toast from "react-hot-toast"
import { format } from "date-fns"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Input,
  Pagination,
  Chip
} from "@nextui-org/react"

interface TableDataProps {
  company_id: number;
  id: number;
}

export const TableData: FC<TableDataProps> = ({ company_id, id }) => {
  const [ search, setSearch ] = useState("")
  const [ page, setPage ] = useState(1)
  const [ pages, setPages ] = useState(1)
  const { data, isLoading, refetch } = useQuery({
    queryKey: [ "stock", { search, page } ],
    queryFn: async () => {
      try {
        const data = await getStock(company_id, search, page)
        const totalPage = Math.ceil(data.total / 5)
        setPages(totalPage)
        return data.stock
      } catch (error) {
        console.error(error)
        toast.error("Error al obtener los datos")
        return []
      }
    }
  })
  useEffect(() => {
    refetch()
  }, [ search, page ])

  const onSearchChange = (value: string) => {
    setPage(1)
    setSearch(value)
  }
  const onClear = () => {
    setPage(1)
    setSearch("")
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-start w-full flex-col sm:flex-row sm:items-center gap-1 sm:w-auto">
          <Input
            isClearable
            className="w-full"
            variant="bordered"
            placeholder="Buscar material"
            size="sm"
            startContent={<SearchIcon className="size-4" />}
            value={search}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>

        <div className="hidden sm:flex sm:gap-1">
          <CreateModal
            company_id={company_id}
          />

          <UploadButton company_id={company_id} />
        </div>
      </div>
      <div className="overflow-x-auto rounded-md">
        <Table
          radius="md"
          isStriped
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                page={page}
                total={pages}
                size="sm"
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "shadow-none border border-gray-300",
          }}
        >
          <TableHeader>
            <TableColumn
              align="center"
            >
              Código
            </TableColumn>
            <TableColumn align="center">
              Nombre
            </TableColumn>
            <TableColumn align="center">
              Descripción
            </TableColumn>
            <TableColumn align="center">
              Cantidad
            </TableColumn>
            <TableColumn align="center">
              Tipo de Unidad
            </TableColumn>
            <TableColumn align="center">
              Fecha de Creación
            </TableColumn>
            <TableColumn align="center">
              Fecha de Actualización
            </TableColumn>
            <TableColumn align="end">
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody
            emptyContent="No hay datos"
            loadingState={isLoading ? "loading" : "idle"}
            loadingContent={<Spinner label="Cargando datos" size="md" />}
          >
            {
              // @ts-ignore
              data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {item.code}
                  </TableCell>
                  <TableCell>
                    {item.name}
                  </TableCell>
                  <TableCell>
                    {item.description}
                  </TableCell>
                  <TableCell>
                    {item.quantity}
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="bordered"
                    >
                      {item.unit_type}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {format(new Date(item.created_at), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                  </TableCell>
                  <TableCell>
                    {format(new Date(item.updated_at), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                  </TableCell>
                  <TableCell
                    className="flex justify-end gap-2"
                  >
                    <UpdateModal
                      data={item}
                    />

                    <DeleteModal
                      id={item.id}
                    />
                  </TableCell>
                </TableRow>
              )) || []
            }
          </TableBody>
        </Table>
      </div>
    </>
  )
}