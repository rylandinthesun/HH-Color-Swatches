import Image from "next/image"
import React, { Dispatch, SetStateAction, useState, useEffect } from "react"
import { useRouter } from "next/router"

type Props = {
  setColorValue: Dispatch<SetStateAction<string>>
}

export default function Navbar({ setColorValue }: Props) {
  const [searchValue, setSearchValue] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const router = useRouter()

  const handleClick = () => {
    setColorValue("")
    router.push("/", undefined, { shallow: true })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  useEffect(() => {
    if (isSubmitted && searchValue) {
      fetch(`https://api.color.pizza/v1/${searchValue}`)
        .then((response) => response.json())
        .then((data) => {
          router.push(`/?color=${data.colors[0].hex.substring(1)}`, undefined, {
            shallow: true,
          })
        })
        .catch((e) => {
          console.log(e)
          router.push("/", undefined, { shallow: true })
        })
      setSearchValue("")
      setIsSubmitted(false)
    }
  }, [isSubmitted, searchValue, router])

  return (
    <nav className="w-full bg-black/80 h-[10vh]">
      <div className="flex h-full justify-between items-center px-6">
        <Image
          src="/logo-symbol.svg"
          alt="Helpful Human Logo"
          width={52}
          height={52}
          className="cursor-pointer hover:scale-90 transition-transform"
          onClick={handleClick}
        />
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="text-4xl text-white mr-2">#</div>
          <input
            className="rounded py-1 px-2 w-52 text-3xl"
            type="text"
            name="search"
            placeholder="000000"
            minLength={3}
            maxLength={6}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
    </nav>
  )
}
