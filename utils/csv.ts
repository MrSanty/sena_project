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