import { CreateModal } from "./modals/CreateModal"
import { UploadButton } from "./ui/UploadButton"
import { TableData } from "./ui/TableData"
import { auth } from "@/auth"
import { DownloadButton } from "./ui/DownloadButton"

const Stock = async () => {
  const session = await auth()

  return (
    <>
      <div className="bg-zinc-50 p-5 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Inventario</h2>

          <div className="flex gap-1 sm:hidden">
            <CreateModal
              company_id={session?.user.company_id as number}
              className="sm:hidden"
            />

            <UploadButton company_id={session?.user.company_id as number} />
            <DownloadButton company_id={session?.user.company_id as number} />
          </div>
        </div>

        <TableData
          id={session?.user.userId as number}
          company_id={session?.user.company_id as number}
        />
      </div>
    </>
  )
}
export default Stock