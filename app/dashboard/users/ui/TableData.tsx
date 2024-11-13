'use client'

import { useQuery } from "@tanstack/react-query"
import { CreateModal } from "../modals/CreateModal"
import { UpdateModal } from "../modals/UpdateModal"
import { DeleteModal } from "../modals/DeleteModal"
import { FC, useEffect, useState } from "react"
import { SearchIcon } from "@/components/icons"
import { getUsers } from "@/actions"
import toast from "react-hot-toast"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Input,
  Select,
  SelectItem
} from "@nextui-org/react"

interface TableDataProps {
  company_id: number;
  id: number;
}

export const TableData: FC<TableDataProps> = ({ company_id, id }) => {
  const [ search, setSearch ] = useState("")
  const [ type_doc, setTypeDoc ] = useState("")
  const { data, isLoading, refetch } = useQuery({
    queryKey: [ "users", { search } ],
    queryFn: async () => {
      try {
        const data = await getUsers(company_id, search, type_doc)
        return data
      } catch (error) {
        toast.error("Error al obtener los usuarios")
        return []
      }
    }
  })
  useEffect(() => {
    refetch()
  }, [ search, type_doc ])

  const onSearchChange = (value: string) => {
    setSearch(value)
  }
  const onClear = () => {
    setSearch("")
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-start flex-col w-full sm:flex-row sm:items-center gap-1 sm:w-auto">
          <Input
            isClearable
            className="w-full"
            variant="bordered"
            placeholder="Buscar un usuario"
            size="sm"
            startContent={<SearchIcon className="size-4" />}
            value={search}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <Select
            className="w-full"
            size="sm" 
            variant="bordered"
            radius="sm"
            placeholder="Selecciona un tipo de documento"
            value={type_doc}
            onChange={(e) => setTypeDoc(e.target.value)}
          >
            <SelectItem key="CC" value="CC">
              CC
            </SelectItem>
            <SelectItem key="CE" value="CE">
              CE
            </SelectItem>
            <SelectItem key="TI" value="TI">
              TI
            </SelectItem>
            <SelectItem key="PPT" value="PPT">
              PPT
            </SelectItem>
            <SelectItem key="PST" value="PST">
              PST
            </SelectItem>
          </Select>
        </div>

        <CreateModal
          company_id={company_id}
          className="hidden sm:flex"
        />
      </div>
      <div className="overflow-x-auto rounded-md">
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
            loadingContent={<Spinner label="Cargando datos" size="md" />}
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
                    <UpdateModal
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
      </div>
    </>
  )
}