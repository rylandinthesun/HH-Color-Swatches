import { useRouter } from "next/router"

type Props = {
  hex: string
}

export default function ColorCard({ hex }: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/?color=${hex.substring(1)}`, undefined, { shallow: true })
  }

  return (
    <div
      onClick={handleClick}
      className="flex flex-col border justify-between rounded-lg shadow-lg w-20 h-28 sm:w-28 sm:h-32 md:w-28 md:h-32 lg:w-40 lg:h-48  cursor-pointer hover:outline hover:outline-black/80 transition-all"
    >
      <div
        style={{ backgroundColor: hex }}
        className="w-full h-5/6 rounded-t-lg"
      ></div>
      <div className="bg-white rounded-b-lg py-2 px-3 text-base lg:text-lg">
        {hex}
      </div>
    </div>
  )
}
