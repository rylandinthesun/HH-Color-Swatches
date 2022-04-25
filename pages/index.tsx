import type { NextPage } from "next"
import { useEffect, useState } from "react"
import Head from "next/head"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ColorCard from "../components/ColorCard"
import ColorPage from "../components/ColorPage"
import { useRouter } from "next/router"

let COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "brown",
  "grey",
]

type ColorObject = {
  hex: string
}

const Home: NextPage = () => {
  const [initialColors, setInitalColors] = useState<ColorObject[]>([])
  const [colorValue, setColorValue] = useState<string>("")

  const [currentPage, setCurrentPage] = useState<number>(1)
  const colorsPerPage = 12

  let indexOfLastColor = currentPage * colorsPerPage
  let indexOfFirstColor = indexOfLastColor - colorsPerPage
  let currentColors = initialColors.slice(indexOfFirstColor, indexOfLastColor)

  let pageNumbers = []
  for (let i = 1; i <= Math.ceil(initialColors.length / colorsPerPage); i++) {
    pageNumbers.push(i)
  }

  const router = useRouter()
  let { color } = router.query

  function shuffle(array: []) {
    let currentIndex = array.length,
      randomIndex

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }
    return array
  }

  useEffect(() => {
    if (colorValue) {
      fetch(`https://api.color.pizza/v1/names/${colorValue}?goodnamesonly=true`)
        .then((response) => response.json())
        .then((data) => {
          setInitalColors(data.colors.slice(0, 100))
        })
    } else {
      fetch("https://api.color.pizza/v1/")
        .then((response) => response.json())
        .then((data) => {
          setInitalColors(shuffle(data.colors).slice(0, 100))
        })
    }
  }, [colorValue])

  return (
    <main className="h-screen w-screen">
      <Head>
        <title>Helpful Human Interview Challenge</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Navbar setColorValue={setColorValue} />
      <div className="flex w-full">
        <Sidebar
          colors={COLORS}
          colorValue={colorValue}
          setColorValue={setColorValue}
          setCurrentPage={setCurrentPage}
        />
        <div className="h-full w-full flex flex-col justify-center items-center">
          {color ? (
            <section className="px-10 md:px-2 lg:px-20 py-8 w-full h-[90vh] flex flex-col items-center justify-center">
              <ColorPage />
            </section>
          ) : (
            <div className="h-[85vh] flex flex-col">
              <section className="p-8 grid grid-rows-4 md:grid-rows-3 grid-flow-col gap-10 h-full place-items-center">
                {currentColors.map((color) => (
                  <ColorCard key={color.hex} hex={color.hex} />
                ))}
              </section>
              <div className="flex w-full justify-center">
                {pageNumbers.map((number) => (
                  <div
                    key={number}
                    className={`${
                      currentPage === number && "border-b border-black"
                    } mr-3 cursor-pointer text-lg`}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
