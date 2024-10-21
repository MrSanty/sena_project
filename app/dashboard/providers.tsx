'use client'

import { SessionProvider } from "next-auth/react"
import { SideBarContext } from "@/hooks"
import { FC, useState } from "react"

export const Providers: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const [ isDrawer, setIsDrawer ] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleDrawer = () => {
    setIsDrawer(!isDrawer)
  }

  return (
    <SessionProvider>
      <SideBarContext.Provider
        value={{
          isSidebarOpen,
          toggleSidebar,
          isDrawer,
          toggleDrawer
        }}
      >
        {children}
      </SideBarContext.Provider>
    </SessionProvider>
  )
}