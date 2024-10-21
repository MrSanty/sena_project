"use client"

import { useContext } from "react"
import { createContext } from 'react'

export const SideBarContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
  isDrawer: false,
  toggleDrawer: () => {}
})

export const useSideBar = () => {
  const { 
    isSidebarOpen, 
    toggleSidebar,
    isDrawer,
    toggleDrawer
  } = useContext(SideBarContext)


  return {
    isSidebarOpen,
    toggleSidebar,
    isDrawer,
    toggleDrawer
  }
}