'use client'

import { SideBarLinks } from "@/components/ui/SideBarLinks"
import { useSideBar } from "@/hooks"
import clsx from "clsx"
import { 
  ArchiveIcon, 
  BuildingIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CloseIcon, 
  UserCircleIcon, 
  UserIcon 
} from "@/components/icons"

export const SideBar = () => {
  const { isSidebarOpen, toggleSidebar, isDrawer, toggleDrawer } = useSideBar()
  

  const links = [
    {
      name: "Usuarios",
      icon: <UserIcon className="size-5" />,
      activeName: "user",
      pathRedirect: "/dashboard/users"
    },
    {
      name: "Roles y Permisos",
      icon: <UserCircleIcon className="size-5" />,
      activeName: "role",
      pathRedirect: "/dashboard/roles"
    },
    {
      name: "Inventario",
      icon: <ArchiveIcon className="size-5" />,
      activeName: "stock",
      pathRedirect: "/dashboard/stock"
    },
    {
      name: "Producción",
      icon: <BuildingIcon className="size-5" />,
      activeName: "production",
      pathRedirect: "/dashboard/production"
    }
  ]

  return (
    <>
      {isDrawer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50  duration-300"
          onClick={toggleDrawer}
        />
      )}

      <nav
        className={clsx(
          "bg-zinc-50 pt-10 lg:p-2 border-r border-zinc-200 h-full",
          isDrawer
            ? ("absolute top-0 left-0 z-50 w-56")
            : (`lg:sidebar hidden transition-all duration-200 lg:inline-block pt-2 px-2 ${ isSidebarOpen ? "w-52" : "w-16" }`)
        )}
      >
        {
          isDrawer && (
            <button
              className="absolute top-3 right-3 size-5 cursor-pointer"
              onClick={toggleDrawer}
            >
              <CloseIcon className="size-6" />
            </button>
          )
        }

        <div
          className={clsx(
            "hidden lg:flex mb-5",
            isSidebarOpen
              ? "justify-end"
              : "justify-center"
          )}
        >
          <button
            className="text-zinc-700 hover:text-zinc-900 hover:bg-transparent rounded-md mt-2"
            onClick={toggleSidebar}
          >
            {
              isSidebarOpen
                ? <ChevronLeftIcon className="w-6 h-6" />
                : <ChevronRightIcon className="w-6 h-6" />
            }
          </button>
        </div>
        <div className={clsx(
          "flex flex-col gap-4 px-2 lg:px-2",
          !isSidebarOpen && "lg:items-center"
        )}>
          {
            links.map((link, index) => (
              <SideBarLinks
                key={index}
                isDrawer={isDrawer}
                isSidebarOpen={isSidebarOpen}
                activeName={link.activeName}
                name={link.name}
                pathRedirect={link.pathRedirect}
                icon={link.icon}
                toggleDrawer={toggleDrawer}
              />
            ))
          }
        </div>
      </nav>
    </>
  )
}