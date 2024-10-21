import Image from "next/image"
import { AuthForm } from "./ui/AuthForm"
import { auth } from "@/auth"

const Login = async () => {
  return (
    <div
      className="bg-white bg-opacity-90 rounded-lg shadow-xl overflow-hidden max-w-md w-full"
    >
      <div className="p-8">
        <div className="text-center mb-8">
          <Image
            src="/logos/Sennova.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            Bienvenido
          </h2>
          <p className="text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>
        <AuthForm />
      </div>
      <div
        className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center"
      >
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} todos los derechos reservados por Centro de Automatización Industrial SENNOVA - Regional Caldas
        </p>
      </div>
    </div>
  )
}
export default Login