import { Dispatch, SetStateAction } from "react"
import ColorButton from "../ColorButton"
import { useRouter } from "next/router"

type Props = {
  colors: string[]
  colorValue: string
  setColorValue: Dispatch<SetStateAction<string>>
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function Sidebar({
  colors,
  colorValue,
  setColorValue,
  setCurrentPage,
}: Props) {
  const router = useRouter()

  const handleRandomColorValue = () => {
    setColorValue("")
    let n = (Math.random() * 0xfffff * 1000000).toString(16)
    let hex = n.slice(0, 6)
    router.push(`/?color=${hex}`, undefined, { shallow: true })
  }

  return (
    <div className="h-[90vh] w-[25%] bg-gray-300 drop-shadow-lg">
      <div className="flex flex-col items-center pt-16">
        <button
          onClick={handleRandomColorValue}
          className="bg-white w-4/5 h-12 border border-black rounded-md text-sm md:text-lg hover:bg-slate-100 active:bg-slate-200 transition"
        >
          Random <span className="hidden lg:inline-block">Color</span>
        </button>
        <div className="flex flex-col h-full items-start w-5/6 mt-6 text-xl">
          {colors.map((color) => (
            <ColorButton
              key={color}
              color={color}
              colorValue={colorValue}
              setColorValue={setColorValue}
              setCurrentPage={setCurrentPage}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
