"use client";

import Image from "next/image"
import Link from "next/link"
import logo from "../../../public/PizzeriaLogo.png"
import { useEffect, useState } from "react"

const Header = () => {

  const[clicked, setClicked] = useState(true)

  useEffect(() => {
    const delay = 500;
    const typing = document.getElementById("typing");
    const text = typing.innerHTML
    const debounce = setTimeout(() => {
      typing.innerText = ""
      typing.classList.add("border-r-4");
      setTimeout(() => {
        typing.innerText = text
        typing.classList.add("animate-typing");
        setTimeout(() => {
          typing.classList.remove("border-r-4", "animate-typing");
        }, 3000);
      }, 1000);
    }, delay);

    return () => {
      setClicked(!clicked)
      clearTimeout(debounce);
    };
  }, [clicked]);
  
  return (
    <div className="flex flex-row w-screen bg-black px-2 py-2 rounded sticky inset-0">
      <div className="w-3/4 flex flex-row justify-between text-gray-500 font-bold">
        <div className="flex flex-row gap-x-5 items-center">
          <Link href="/" className="text-2xl text-amber-600 overflow-hidden whitespace-nowrap" id="typing" onClick={() => setClicked(!clicked)}>Pizzeria</Link>
          <Link href="/" onClick={() => setClicked(!clicked)}>
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