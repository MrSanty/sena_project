import { Poppins } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { Providers } from "./providers"
import { FC } from "react"
import "./globals.css"

interface RootLayoutProps {
  children: React.ReactNode
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
})

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className=''>
      <body className={`${poppins.className} antialiased`}>
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
export default RootLayout