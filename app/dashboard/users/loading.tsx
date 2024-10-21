import { Spinner } from "@nextui-org/react"

const loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Spinner size="lg" />
    </div>
  )
}
export default loading