"use client";

import Image from "next/image"
import Link from "next/link"
import logo from "../../public/PizzeriaLogo.png"
import hamburger from "../../public/hamburger.png"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../utils/authUtil";
import { setUser } from "@/store/slice/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchCartCountRequest } from "@/store/slice/cartSlice";

const Header = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const [clicked, setClicked] = useState(true)
  const [menu, setMenu] = useState(false)
  const initialRender = useRef(true)
  const pathname = usePathname()
  const { cartCount } = useSelector(state => state.cart)
  const { user, loggedInStatus } = useSelector(state => state.user)

  useEffect(() => {
    console.log(localStorage);
    const details = JSON.parse(localStorage.getItem("user"))
    if(details) {
      dispatch(setUser({user: details.user, loggedInStatus: true}))
      dispatch(fetchCartCountRequest())
    }
  }, [])

  useEffect(() => {
    if(!loggedInStatus){
      if(pathname === "/cart") {
        router.push("/")
        toast.warn("Please login")
      }
      else toast.dismiss()
    }
    else toast.dismiss()
  }, [pathname])
  
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

  useEffect(() => {
    const ele = document.getElementById("hamburger")
    const main = document.getElementById("main")
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!menu) {
      ele.classList.remove("animate-slideLeft")
      ele.classList.add("animate-slideRight")
      main.classList.add("overflow-auto")
      main.classList.remove("overflow-hidden")
    }
    else {
      ele.classList.remove("animate-slideRight")
      ele.classList.add("animate-slideLeft")
      main.classList.add("overflow-hidden")
      main.classList.remove("overflow-auto")
    }
  }, [menu])

  const logout = () => {
    if(loggedInStatus)
      clearAuth(dispatch)
  }

  const cart = () => {
    if(!loggedInStatus)
      toast.warn("Please Login")
  }

  return (
    <div className="flex items-center md:flex-row w-screen bg-black p-2 sticky inset-0">
      <div className="md:hidden absolute right-4" onClick={() => setMenu(!menu)}>
        <Image src={hamburger} alt="Icon" height={20} width={20} />
      </div>
      <div className="flex translate-x-full absolute inset-0 bg-black h-screen w-screen flex-col justify-center items-center gap-10" id="hamburger">
        <div className="absolute text-2xl text-amber-600 font-bold top-3 right-4" onClick={() => setMenu(!menu)}>X</div>
        <Link href="/orderPizza" className="text-amber-600 text-2xl font-bold" onClick={() => setMenu(!menu)}>Order Pizza</Link>
        <Link href="/buildPizza" className="text-amber-600 text-2xl font-bold" onClick={() => setMenu(!menu)}>Build Pizza</Link>
        <Link href="/login" className="text-amber-600 text-2xl font-bold" onClick={() => setMenu(!menu)}>Log In</Link>
        <Link href="/cart" className="text-amber-600 text-2xl font-bold" onClick={() => setMenu(!menu)}>Cart</Link>
      </div>
      <div className="w-3/4 flex justify-between text-gray-500 font-bold">
        <div className="flex gap-x-5 items-center">
          <div className="w-[10ch] flex items-center">
            <Link href="/" className="text-2xl text-amber-600 overflow-hidden whitespace-nowrap" id="typing" onClick={() => setClicked(!clicked)}>Pizzeria</Link>
          </div>
          <Link href="/" className="header-nav" onClick={() => setClicked(!clicked)}>
            <Image src={logo} alt="Pizzeria Logo" height={45} width={45} />
          </Link>
          <Link className="header-nav" href="/orderPizza">Order Pizza</Link>
          <Link className="header-nav" href="/buildPizza">Build Pizza</Link>
        </div>
        <div className={`text-teal-400 font-bold ${!loggedInStatus ? "hidden" : "flex"} items-center`}>
          <span>Hi {user?.name}</span>
        </div>
      </div>
      <div className="header-nav md:w-1/4 md:flex md:flex-row md:justify-evenly md:items-center">
        <Link href={!loggedInStatus ? "/login": "/"} className="btn" onClick={logout}>Log {!loggedInStatus ? "In" : "Out"}</Link>
        <div className="relative btn">
          <Link href={!loggedInStatus ? `${pathname}` :"/cart"} onClick={cart}>Cart</Link>
          <div className={`absolute h-[20px] w-[20px] -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full ${loggedInStatus ? "flex" : "hidden"} justify-center items-center`}>
            <span>{cartCount}</span></div>
        </div>
      </div>
    </div>
  )
}

export default Header