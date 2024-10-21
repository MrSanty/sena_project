'use client'

import { getUsers } from "@/actions/user/getUsers"
import { useQuery } from "@tanstack/react-query"
import { DeleteModal } from "./DeleteModal"
import { EditModal } from "./EditModal"
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

interface TableDataProps {
  company_id: number,
  id: number
}

export const TableData: FC<TableDataProps> = ({ company_id, id }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const data = await getUsers(company_id)
        return data
      } catch (error) {
        toast.error("Error al obtener los usuarios")
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
          Nombre
        </TableColumn>
        <TableColumn align="center">
          Email
        </TableColumn>
        <TableColumn align="center">
          Tipo de Documento
        </TableColumn>
        <TableColumn align="center">
          Número de Documento
        </TableColumn>
        <TableColumn align="center">
          Rol
        </TableColumn>
        <TableColumn align="end">
          Acciones
        </TableColumn>
      </TableHeader>
      <TableBody
        emptyContent="No hay datos"
        loadingState={isLoading ? "loading" : "idle"}
        loadingContent={<Spinner size="sm" />}
      >
        {
          data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {item.first_name} {item.last_name}
              </TableCell>
              <TableCell>
                {item.email}
              </TableCell>
              <TableCell>
                {item.type_doc}
              </TableCell>
              <TableCell>
                {item.num_doc}
              </TableCell>
              <TableCell>
                Administrador
              </TableCell>
              <TableCell
                className="flex justify-end gap-2"
              >
                <EditModal
                  data={item}
                />

                {
                  (id !== item.id) && (
                    <DeleteModal
                      id={item.id}
                    />
                  )
                }
              </TableCell>
            </TableRow>
          )) || []
        }
      </TableBody>
    </Table>
  )
}