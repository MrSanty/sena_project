import { auth } from "@/auth"
import { TableData } from "./ui/TableData"

const User = async () => {
  const session = await auth()

  return (
    <>
      <div className="bg-zinc-50 p-5 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Usuarios</h2>
          {/* <CreateModal
            addUser={addUser}
            className="sm:hidden"
          /> */}
        </div>
        <div className="flex justify-between items-center mb-3">
          {/* <div className="flex items-start flex-col sm:flex-row sm:items-center gap-1">
            <Input
              isClearable
              className="w-full"
              variant="bordered"
              placeholder="Buscar usuario"
              size="sm"
              startContent={<SearchIcon className="size-4" />}
              value={search}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>

          <CreateModal
            addUser={addUser}
            className="hidden sm:flex"
          /> */}
        </div>
        <div className="overflow-x-auto rounded-md">
          {/* <TableData
            userLogged={userData.email}
            data={tempData}
            editUser={editUser}
            deleteUser={deleteUser}
          /> */}
          <TableData
            company_id={session?.user.company_id as number}
          />
        </div>
      </div>
    </>
  )
}
export default User