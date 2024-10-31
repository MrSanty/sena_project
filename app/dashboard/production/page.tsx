import { auth } from "@/auth"
import { TabMain } from "./ui/TabMain"


const page = async () => {
  const session = await auth()

  return (
    <>
      <div className="bg-zinc-50 p-5 rounded-md max-h-full overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Producción</h2>
        </div>
        <TabMain company_id={session?.user?.company_id as number} />
      </div>
    </>
  )
}
export default page