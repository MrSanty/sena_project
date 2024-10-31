'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateMultipleStockServer } from '@/interfaces/StockData'
import { addMasiveStock } from '@/actions'
import { readCsvFile } from '@/utils/csv'
import toast from 'react-hot-toast'
import { useRef } from 'react'

export const useAddMasive = (company_id: number) => {
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { mutate } = useMutation({
    mutationFn: async (data: CreateMultipleStockServer[]) => {
      try {
        const response = await addMasiveStock(data)
        return response
      } catch (error) {
        throw new Error(error as string)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['stock'],
      })

      toast.dismiss('addStock')
      toast.success('Archivo CSV cargado correctamente')
      fileInputRef.current!.value = ''
    },
    onError: () => {
      toast.dismiss('addStock')
      toast.error('Error al cargar el archivo CSV')
      fileInputRef.current!.value = ''
    },
  })

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        try {
          const data = await readCsvFile(file, company_id)
          toast.loading('Cargando archivo CSV...', { id: 'addStock' })
          mutate(data as CreateMultipleStockServer[])
        } catch (error) {
          toast.error('Error al Leer el archivo CSV')
        }
      } else {
        alert('El archivo debe ser de tipo CSV')
      }
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return { handleUpload, handleFileChange, fileInputRef }
}
