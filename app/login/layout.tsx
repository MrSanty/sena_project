import type { Metadata } from "next"
import { FC } from "react"

interface LoginLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
}

const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-login">
      {children}
    </div>
  )
}
export default LoginLayout