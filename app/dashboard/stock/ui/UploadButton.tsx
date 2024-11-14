'use client'

import { UploadIcon } from '@/components/icons'
import { Button } from '@nextui-org/react'
import { useAddMasive } from '@/hooks'
import { FC } from 'react'

interface UploadButtonProps {
  company_id: number
}

export const UploadButton: FC<UploadButtonProps> = ({ 
  company_id 
}) => {
  const {
    handleUpload,
    handleFileChange,
    fileInputRef
  } = useAddMasive(company_id)

  return (
    <>
      <Button
        onClick={handleUpload}
        size='sm'
        className="flex items-center gap-1 min-w-fit bg-zinc-900 text-white"
      >
        <UploadIcon className="m-0 sm:mr-1 h-4 w-4" />
        <span className="hidden sm:block">
          Importar CSV
        </span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
    </>
  )
}