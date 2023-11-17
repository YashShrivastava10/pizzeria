"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginRequest, signUpRequest } from "@/store/slice/userSlice"
import { useRouter } from "next/navigation"
import { AuthForm } from "./AuthForm"

const AuthLayout = ({ status }) => {

  const dispatch = useDispatch()
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [user, setUser] = useState({name: "", email: "", pass: ""})
  const { loggedInStatus } = useSelector(state => state.user)
  const router = useRouter()
  
  const handleUser = (e) => {
    const name = e.target.name
    const value = e.target.value
    const updatedUser = {...user, [name]: value}
    setUser(updatedUser)
  }

  useEffect(() => {
    if(loggedInStatus) router.push("/")
  }, [loggedInStatus])

  const handleSubmit = (e) => {
    e.preventDefault()
    statusEntries[status].dispatch()
  }

  const statusEntries = {
    "signin": {
      dispatch: () => dispatch(loginRequest((({name, ...user}) => user)(user))),
      header: "Welcome Back!",
      message: "Don't have an account?",
      link: "/signUp",
      linkMessage: "Sign Up"
    },
    "signup": {
      dispatch: () => dispatch(signUpRequest(user)),
      header: "Sign Up",
      message: "Already have an account?",
      link: "/login",
      linkMessage: "Login"
    }
  }

  return (
    <div className="md:h-96 h-full w-1/1 flex justify-center items-center">
      <div className="h-full md:w-1/3 sm:w-1/2 w-full bg-amber-500 sm:rounded-xl p-3 flex flex-col justify-start">
        <div className="flex flex-col items-center justify-center p-7 gap-y-8 bg-white h-[90%] w-full relative rounded-xl" style={{ clipPath: "polygon(100% 0, 100% 100%, 0% 80%, 0 0)" }}>
          <span className="font-bold text-2xl text-amber-500">{statusEntries[status].header}</span>
          <AuthForm 
            status = {status}
            user = {user}
            handleUser = {handleUser}
            handleSubmit = {handleSubmit}
            passwordHidden = {passwordHidden}
            setPasswordHidden = {setPasswordHidden}
          />
        </div>
        <div className="flex gap-1 justify-center text-blue-800 mt-5">
          <span className="italic">{statusEntries[status].message}</span>
          <Link href={statusEntries[status].link} className="font-bold">{statusEntries[status].linkMessage}</Link>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout