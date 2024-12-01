import { Spinner } from "../ui/spinner"

export const LoadingLayout = () => {
  return (
    <div className="h-screen flex justify-center mt-10">
     <Spinner />
    </div>
  )
}