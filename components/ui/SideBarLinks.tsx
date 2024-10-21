

import { usePathname, useRouter } from "next/navigation"
import { Tooltip } from "@nextui-org/react"
import { FC } from "react"
import clsx from 'clsx'

interface SideBarLinksProps {
  isDrawer: boolean
  isSidebarOpen: boolean
  activeName: string
  name: string
  pathRedirect: string
  icon: JSX.Element
  toggleDrawer: () => void
}

export const SideBarLinks: FC<SideBarLinksProps> = ({
  isDrawer,
  isSidebarOpen,
  activeName,
  name,
  pathRedirect,
  icon,
  toggleDrawer
}) => {
  const pathname = usePathname()
  const router = useRouter()

  const redirectTo = () => {
    router.push(pathRedirect)
    if (isDrawer) {
      toggleDrawer()
    }
  }

  return (
    <Tooltip
      showArrow 
      placement="right"
      content={name}
      isDisabled={isDrawer || isSidebarOpen}
    >
      <button
        className={clsx(
          "flex items-center gap-2 py-1 px-2 text-zinc-700 hover:text-zinc-800 cursor-pointer rounded-md hover:bg-zinc-200 overflow-hidden",
          pathname.includes(activeName) && "bg-zinc-200"
        )}
        onClick={redirectTo}
      >
        {icon}
        {
          isDrawer || isSidebarOpen
            ? (
              <span className="text-sm">{name}</span>
            )
            : ""
        }
      </button>
    </Tooltip>
  )
}

