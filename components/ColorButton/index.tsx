import { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/router"

type Props = {
  color: string
  colorValue: string
  setColorValue: Dispatch<SetStateAction<string>>
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function ColorButton({
  color,
  colorValue,
  setColorValue,
  setCurrentPage,
}: Props) {
  const router = useRouter()

  const handleClick = () => {
    setColorValue(color)
    setCurrentPage(1)
    router.push("/", undefined, { shallow: true })
  }

  return (
    <button
      onClick={handleClick}
      className={`${
        colorValue === color && "bg-gray-200"
      } py-1 px-2 mb-1 mr-4 capitalize hover:bg-gray-200 rounded-md active:bg-gray-100 transition`}
    >
      {color}
    </button>
  )
}
