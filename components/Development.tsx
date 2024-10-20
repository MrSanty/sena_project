import Image from "next/image"

export const Development = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/development.png"
            alt="Imagen minimalista de desarrollo"
            width={300}
            height={300}
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Aún en desarrollo</h1>
        <p className="text-xl text-gray-600">
          Estamos trabajando para mejorar esta página. Vuelve pronto.
        </p>
      </div>
    </div>
  )
}