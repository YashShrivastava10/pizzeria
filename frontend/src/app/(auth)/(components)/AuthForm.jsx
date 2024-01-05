"use client"

import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import show from "../../../../public/show.png"
import hide from "../../../../public/hide.png"
import Image from "next/image"
import { googleLoginRequest, loginRequest, signUpRequest } from "@/store/slice/userSlice"
import { statusEntries } from "./AuthLayout"

import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"

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

  const auth = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: "GET",
        mode: "cors",
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
      })
      const data = await response.json()
      const { name, email } = data
      setUser(prevUser => ({ ...prevUser, name, email, pass: "" }));
      const updatedUser = { name, email, pass: "" }
      if (status === "signup") dispatch(signUpRequest(updatedUser))
      else dispatch(googleLoginRequest({email}))
    },
    flow: "implicit"
  });

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
      <div className={`w-full flex justify-between items-center text-gray-500 text-sm ${statusEntries[status].hidden}`}>
        <div className="flex gap-x-2">
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Remember Me</label>
        </div>
        <Link href="/forgetPassword">Forget Password?</Link>
      </div>
      <div className="w-full">
        <button className="w-full rounded-3xl p-1 bg-blue-800 text-white font-bold hover:bg-amber-600 hover:rounded transition-all duration-300 ease-in">{statusEntries[status].header}</button>
      </div>
      <div className="flex justify-center items-center gap-2 w-[80%] rounded-3xl p-1 bg-white border-2
      border-amber-600 text-amber-600 font-bold hover:rounded transition-all duration-300 ease-in sm:w-full" onClick={() => auth()}>
        <span>{statusEntries[status].auth}</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="15.25" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
      </div>
    </form>
  )
}