"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginRequest, signUpRequest } from "@/store/slice/userSlice"
import { useRouter } from "next/navigation"
import { AuthForm } from "./AuthForm"
import { sendEmail } from "@/utils/sendEmail"

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

  const handleClick = async() => {
    await sendEmail()
  }

  return (
    <div className="md:h-[80%] h-full w-1/1 flex justify-center items-center">
      <div className="h-full md:w-1/3 sm:w-1/2 w-full bg-amber-500 sm:rounded-xl p-4 flex flex-col justify-start">
        <div className="flex flex-col items-center justify-start md:p-4 p-8 gap-y-8 bg-white h-[80%] w-full relative rounded-xl shadow-3xl" style={{ clipPath: "polygon(100% 0, 100% 100%, 0% 80%, 0 0)" }}>
          <span className="font-bold text-2xl text-amber-500">{statusEntries[status].header}</span>
          <div className="flex flex-col border-0">
            <AuthForm 
              status = {status}
              user = {user}
              handleUser = {handleUser}
              handleSubmit = {handleSubmit}
              passwordHidden = {passwordHidden}
              setPasswordHidden = {setPasswordHidden}
            />
            <Link href="/forgetPassword" className="text-right text-sm cursor-pointer">Forget Password?</Link>
          </div>
        </div>
        {/* <div className="flex gap-1 justify-center text-blue-800 mt-5">
          <span className="italic">{statusEntries[status].message}</span>
          <Link href={statusEntries[status].link} className="font-bold">{statusEntries[status].linkMessage}</Link>
        </div> */}
        <div className="flex gap-1 justify-center text-blue-800 mt-5">
          <span className="italic">{statusEntries[status].message}</span>
          <Link href={statusEntries[status].link} className="font-bold">{statusEntries[status].linkMessage}</Link>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout