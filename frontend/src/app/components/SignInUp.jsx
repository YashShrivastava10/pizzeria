"use client"

import Link from "next/link"
import hide from "../../../public/hide.png"
import show from "../../../public/show.png"
import login from "../../../public/login.png"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginRequest, signUpRequest } from "../store/slice/userSlice"
import { useRouter } from "next/navigation"

const SignInUp = ({ status }) => {

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
    if(status === "signup") dispatch(signUpRequest(user))
    else dispatch(loginRequest((({name, ...user}) => user)(user)))
  }

  return (
    <div className="md:h-96 h-full w-1/1 flex justify-center items-center">
      <div className="h-full md:w-1/3 sm:w-1/2 w-full bg-amber-500 sm:rounded-xl p-3 flex flex-col justify-start">
        <div className="flex flex-col items-center justify-center p-7 gap-y-8 bg-white h-[90%] w-full relative rounded-xl" style={{ clipPath: "polygon(100% 0, 100% 100%, 0% 80%, 0 0)" }}>
          <span className="font-bold text-2xl text-amber-500">{status === "signin" ? "Welcome Back!" : "Sign Up"}</span>
          <form className="form-div" onSubmit={handleSubmit}>
            {status !== "signin" && 
            <div className="form-div">
              <input className="form-input name" id="name" name="name" value={user.name} type="text" placeholder="Name" required onChange={(e) => handleUser(e)}/>
              <label className="label-name" htmlFor="name">Name</label>
            </div>}
            <div className="form-div">
              <input className="form-input email" id="mail" name="email" value={user.email} type="email" placeholder="Email" required onChange={(e) => handleUser(e)}/>
              <label className="label-email" htmlFor="mail">Email</label>
            </div>
            <div className="form-div relative">
              <input className="form-input relative pass" id="pass" name="pass" value={user.pass} type={passwordHidden ? "password" : "text"} placeholder="Password" required onChange={(e) => handleUser(e)}/>
              <label className="label-pass" htmlFor="pass">Password</label>
              <Image src={passwordHidden ? show : hide} id="pass-img" alt="Eye" height={20} width={20} className="absolute top-0 right-0" onClick={() => setPasswordHidden(!passwordHidden)} />
            </div>
            <button className="absolute bottom-4 sm:bottom-2 right-1 text-white bg-amber-500 shadow-lg rounded-full h-8 w-8 hover:bg-sky-800 hover:rounded transition-rounded duration-200 ease-in flex justify-center items-center" type="submit">
              <Image src={login} alt="X" height={20} width={20} />
            </button>
          </form>
        </div>
        <div className="flex gap-1 justify-center text-blue-800 mt-5">
          <span className="italic">{status === "signin" ? "Don't have an account?":"Already have an account?"}</span>
          <Link href={status === "signin" ? "/signUp" : "/login"} className="font-bold">{status === "signin" ? "Sign up" : "Login"}</Link>
        </div>
      </div>
    </div>
  )
}

export default SignInUp