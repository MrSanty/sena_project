'use client'

export const readCsvFile = async (file: File, company_id: number) => {
  const reader = new FileReader()
  reader.readAsText(file)
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      const csv = e.target?.result as string
      const rows = csv.split('\n').slice(1).filter(row => row !== '')
      const data = rows.map(row => {
        const [
          code, 
          name, 
          description, 
          quantity, 
          unit_type
        ] = row.split(',')

        return { 
          code, 
          name, 
          description, 
          quantity: parseInt(quantity),
          unit_type: unit_type?.replace('\r', ''),
          company_id
        }
      })
      resolve(data)
    }
    reader.onerror = (e) => {
      reject(e)
    }
  })
}

// export data with csv format  and headers
export const exportCsvFile = (data: any[], filename: string) => {
  const headers = Object.keys(data[0]).join(',')
  const values = data.map(item => Object.values(item).join(',')).join('\n')
  const csv = `${headers}\n${values}`
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}