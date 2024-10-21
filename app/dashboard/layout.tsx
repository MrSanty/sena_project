import { Providers } from "./providers"
import { SideBar } from "./ui/SideBar"
import { Navbar } from "./ui/Navbar"
import { Footer } from "./ui/Footer"
import type { Metadata } from "next"
import { FC } from "react"


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div
      className="max-h-screen bg-zinc-200/50 grid-container"
    >
      <Providers>
        <SideBar />
        <Navbar />
      </Providers>
      <main
        className="main py-5 px-2 lg:px-5"
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DashboardLayout