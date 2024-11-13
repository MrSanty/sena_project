'use client'

/* import { UpdateModal } from "../modals/UpdateModal"
import { DeleteModal } from "../modals/DeleteModal"
import { CreateModal } from "../modals/CreateModal" */
import { useQuery } from "@tanstack/react-query"
import { FC, useEffect, useState } from "react"
import { SearchIcon } from "@/components/icons"
/* import { UploadButton } from "./UploadButton" */
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
  Chip,
  Select,
  SelectItem
} from "@nextui-org/react"
import { getProcess } from "@/actions/process/getProcess"
import { CreateModal } from "./modals/CreateModal"
import { UpdateModal } from "./modals/UpdateModal"
import { DeleteModal } from "./modals/DeleteModal"

export const Process = () => {
  const [ search, setSearch ] = useState("")
  const [ status, setStatus ] = useState("")
  const { data, isLoading, refetch } = useQuery({
    queryKey: [ "process", search ],
    queryFn: async () => {
      try {
        const data = await getProcess(search, status)
        return data
      } catch (error) {
        console.error(error)
        toast.error("Error al obtener los datos")
        return []
      }
    }
  })
  useEffect(() => {
    refetch()
  }, [ search, status ])

  const onSearchChange = (value: string) => {
    setSearch(value)
  }
  const onClear = () => {
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
            placeholder="Buscar"
            size="sm"
            startContent={<SearchIcon className="size-4" />}
            value={search}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <div className="w-full flex gap-1">
            <Select
              className="w-full"
              placeholder="Estado"
              variant="bordered"
              size="sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <SelectItem key="Proceso" value="Proceso">
                Proceso
              </SelectItem>
              <SelectItem key="Suspendido" value="Suspendido">
                Suspendido
              </SelectItem>
              <SelectItem key="Problema" value="Problema">
                Problema
              </SelectItem>
              <SelectItem key="Finalizado" value="Finalizado">
                Finalizado
              </SelectItem>
            </Select>

            <CreateModal
              company_id={1}
              className="sm:hidden"
            />
          </div>
        </div>

        <div className="hidden sm:flex sm:gap-1">
          <CreateModal
            company_id={1}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-md">
        <Table
          radius="md"
          isStriped
          classNames={{
            wrapper: "shadow-none border border-gray-300",
          }}
        >
          <TableHeader>
            <TableColumn align="center">
              Nombre
            </TableColumn>
            <TableColumn align="center">
              Estado
            </TableColumn>
            <TableColumn align="center">
              Producto
            </TableColumn>
            <TableColumn align="center">
              Cantidad
            </TableColumn>
            <TableColumn align="center">
              Tiempo estimado (min)
            </TableColumn>
            <TableColumn align="center">
              Fecha de inicio
            </TableColumn>
            <TableColumn align="center">
              Ultima actualización
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
              data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {item.name}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={
                        item.status === "Proceso" ? "primary" :
                          item.status === "Finalizado" ? "success" :
                            item.status === "Problema" ? "danger" : "warning"
                      }
                      size="sm"
                    >
                      {item.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {item.product.name}
                  </TableCell>
                  <TableCell>
                    {item.quantity}
                  </TableCell>
                  <TableCell>
                    {item.estimated_time}
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