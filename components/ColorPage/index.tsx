import { useRouter } from "next/router"

type Props = {}

let percentages = ["75%", "90%", "100%", "110%", "125%"]

export default function ColorPage({}: Props) {
  const router = useRouter()
  const { color } = router.query

  const handleBack = () => {
    router.push("/", undefined, { shallow: true })
  }

  return (
    <>
      <div className="rounded-lg shadow-lg w-full md:w-5/6 h-[400px] pb-6 md:pb-0 md:h-[550px] border mt-4 transition-all">
        <div
          style={{ backgroundColor: `#${color}` }}
          className="w-full h-5/6 rounded-t-lg"
        ></div>
        <div className="bg-white rounded-b-lg p-6 text-3xl">#{color}</div>
      </div>
      <div className="flex w-full md:w-5/6 space-x-2 justify-between mt-6 pb-6">
        {percentages.map((percent) => (
          <div
            key={percent}
            className="h-20 pb-2 md:pb-0 md:h-[120px] border w-20 md:w-32 shadow-lg rounded-lg"
          >
            <div
              style={{
                backgroundColor: `#${color}`,
                filter: `brightness(${percent})`,
              }}
              className="w-full h-[65%] rounded-t-lg"
            ></div>
            <div className="bg-white rounded-b-lg text-sm md:text-lg px-1 md:px-3 py-2">
              #{color}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1">
        <button
          className="w-48 h-10 border border-black rounded-md hover:bg-slate-100 active:bg-slate-200 transition"
          onClick={handleBack}
        >
          Clear
        </button>
      </div>
    </>
  )
}
