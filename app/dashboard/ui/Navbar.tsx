'use client'

import { MenuIcon } from "@/components/icons"
import { DynamicBreadcrumbs } from "@/components"
import { useSideBar } from "@/hooks/useSideBar"
import { logout } from "@/actions/auth/logout"
import { 
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownTrigger,
  BreadcrumbItem, 
  Breadcrumbs 
} from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export const Navbar = () => {
  const session = useSession()
  const { toggleDrawer } = useSideBar()
  const router = useRouter()

  return (
    <header className="header flex items-center justify-between px-2 py-2 lg:pl-3 lg:pr-5">
      <div className="flex items-center gap-2">
        <button
          className="text-zinc-700 hover:text-zinc-900 hover:bg-transparent rounded-md lg:hidden"
          onClick={toggleDrawer}
        >
          <MenuIcon className="size-6" />
        </button>

        <DynamicBreadcrumbs />
      </div>
      <div className="flex items-center">
        <Dropdown
          radius="sm"
          className="min-w-0 w-fit"
        >
          <DropdownTrigger>
            <button
              className="flex items-center justify-center rounded-full py-[0.25rem] px-[0.7rem] border-2 border-zinc-800 uppercase"
            >
              {session.data?.user?.name[0] || "U"}
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            {/* <DropdownItem>Configuración</DropdownItem> */}
            <DropdownItem
              className="text-red-500 hover:text-red-600 focus:text-red-600"
              onClick={() => {
                logout()
              }}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}