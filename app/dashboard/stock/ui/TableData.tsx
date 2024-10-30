'use client'

import { UpdateModal } from "../modals/UpdateModal"
import { useQuery } from "@tanstack/react-query"
import { getStock } from "@/actions"
import { es } from "date-fns/locale"
import toast from "react-hot-toast"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner
} from "@nextui-org/react"
import { FC } from "react"
import { format } from "date-fns"
import { DeleteModal } from "../modals/DeleteModal"

interface TableDataProps {
  company_id: number;
  id: number;
}

export const TableData: FC<TableDataProps> = ({ company_id, id }) => {
  const { data, isLoading } = useQuery({
    queryKey: [ "stock" ],
    queryFn: async () => {
      try {
        const data = await getStock(company_id)
        return data
      } catch (error) {
        console.error(error)
        toast.error("Error al obtener los datos")
        return []
      }
    }
  })

  return (
    <Table
      radius="md"
      isStriped
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
                {item.unit_type}
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
  )
}