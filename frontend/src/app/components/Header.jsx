import Image from "next/image"
import Link from "next/link"
import logo from "../../../public/PizzeriaLogo.png"

const Header = () => {
  return (
    <div className="flex flex-row w-screen bg-black px-2 py-2 rounded sticky top-0">
      <div className="w-3/4 flex flex-row justify-between text-gray-500 font-bold">
        <div className="flex flex-row gap-x-5 items-center">
          <Link href="/" className="text-2xl text-amber-600 border-r-4 animate-typing overflow-hidden whitespace-nowrap">Pizzeria</Link>
          <Link href="/">
            <Image src={logo} alt="Pizzeria Logo" height={45} width={45}/>
          </Link>
          <Link href="/orderPizza">Order Pizza</Link>
          <Link href="/buildPizza">Build Pizza</Link>
        </div>
        <div className="text-teal-400 font-bold flex items-center">
          <span>Hi Yash</span>
        </div>
      </div>
      <div className="w-1/4 flex flex-row justify-evenly items-center">
        <Link href="/login" className="btn">Log In</Link>
        <Link href="/cart" className="btn">Cart</Link>
      </div>
    </div>
  )
}

export default Header