import { CreateModal } from "./modals/CreateModal"
import { TableData } from "./ui/TableData"
import { auth } from "@/auth"

const User = async () => {
  const session = await auth()

  return (
    <>
      <div className="bg-zinc-50 p-5 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Usuarios</h2>
          <CreateModal
            company_id={session?.user.company_id as number}
            className="sm:hidden"
          />
        </div>
        <TableData
          id={session?.user.userId as number}
          company_id={session?.user.company_id as number}
        />
      </div>
    </>
  )
}
export default User