"use client"

import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import show from "../../../../public/show.png"
import hide from "../../../../public/hide.png"
import Image from "next/image"
import { loginRequest, signUpRequest } from "@/store/slice/userSlice"
import { statusEntries } from "./AuthLayout"

export const AuthForm = ({ status }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [user, setUser] = useState({ name: "", email: "", pass: "" })
  const { loggedInStatus } = useSelector(state => state.user)
  const { loading } = useSelector(state => state.loading)

  useEffect(() => {
    if (loggedInStatus) router.push("/")
  }, [loggedInStatus])

  const handleUser = (e) => {
    const name = e.target.name
    const value = e.target.value
    const updatedUser = { ...user, [name]: value }
    setUser(updatedUser)
  }

  const method = {
    signin: {
      dispatch: () => dispatch(loginRequest((({ name, ...user }) => user)(user)))
    },
    signup: {
      dispatch: () => dispatch(signUpRequest(user))
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    method[status].dispatch()
  }

  return (
    <form className={`flex flex-col justify-center items-center w-[80%] gap-y-2 ${loading && 'pointer-events-none'}`} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center gap-y-2 w-full">
        {status === "signup" &&
          <input className="form-input" name="name" value={user.name} type="text" placeholder="Name" required onChange={(e) => handleUser(e)} />
        }
        <input className="form-input" name="email" value={user.email} type="email" placeholder="Email" required onChange={(e) => handleUser(e)} />
        <div className="w-full relative">
          <input className="form-input" name="pass" value={user.pass} type={passwordHidden ? "password" : "text"} placeholder="Password" required onChange={(e) => handleUser(e)} />
          <Image src={passwordHidden ? show : hide} id="pass-img" alt="Eye" height={20} width={20} className="absolute top-2 right-2 cursor-pointer" onClick={() => setPasswordHidden(!passwordHidden)} />
        </div>
      </div>
      {/* <div className={`w-full flex justify-between items-center text-gray-500 text-sm ${statusEntries[status].hidden}`}>
        <div className="flex gap-x-2">
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Remember Me</label>
        </div>
        <Link href="/forgetPassword">Forget Password?</Link>
      </div> */}
      <div className="w-full">
        <button className="w-full rounded-3xl p-1 bg-blue-800 text-white font-bold hover:bg-amber-600 hover:rounded transition-all duration-300 ease-in">{statusEntries[status].header}</button>
      </div>
    </form>
  )
}