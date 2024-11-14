'use client'

import { UploadIcon } from '@/components/icons'
import { Button } from '@nextui-org/react'
import { useAddMasive } from '@/hooks'
import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllStock } from '@/actions/stock/getAllStock'
import { exportCsvFile } from '@/utils/csv'
import { DownloadIcon } from '@/components/icons/DownloadIcon'

interface DownloadButtonProps {
  company_id: number
}

export const DownloadButton: FC<DownloadButtonProps> = ({ 
  company_id 
}) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [ "stock" ],
    queryFn: async () => {
      try {
        const data = await getAllStock(company_id)
        return data
      } catch (error) {
        return []
      }
    }
  })

  const handleDownload = async() => {
    await refetch()
    exportCsvFile(data!, 'stock')
  }

  return (
    <>
      <Button
        onClick={handleDownload}
        size='sm'
        className="flex items-center gap-1 min-w-fit bg-zinc-900 text-white"
        isLoading={isLoading}
      >
        <DownloadIcon className="m-0 sm:mr-1 h-4 w-4" />
        <span className="hidden sm:block">
          Exportar CSV
        </span>
      </Button>
    </>
  )
}