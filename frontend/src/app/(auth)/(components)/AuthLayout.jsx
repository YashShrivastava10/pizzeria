// "use client" // just to acces statusEntries

import Link from "next/link";
import { AuthForm } from "./AuthForm"
import ForgetForm from "@/app/(auth)/(components)/ForgetPassword"

export const statusEntries = {
  "signin": {
    header: "LOGIN",
    message: (
      <span className="text-gray-500 text-sm">
        Don't have an account?{" "}
        <Link href="/signUp" className="font-bold text-amber-600">
          SIGN UP
        </Link>
      </span>
    ),
    hidden: ''
  },
  "signup": {
    header: "SIGN UP",
    message: (
      <span className="text-gray-500 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-amber-600">
          LOGIN
        </Link>
      </span>
    ),
    hidden: 'hidden'
  },
  "forget": {
    header: "FORGOT PASSWORD",
  },
};

const AuthLayout = ({ status }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full w-full bg-gradient-to-r from-amber-600 to-sky-800 flex justify-center items-center">
        <div className="rounded-full bg-white h-[325px] aspect-square sm:h-[400px] outline outline-[30px] outline-white/[.10] flex flex-col justify-center items-center gap-y-2 relative">
          <div className="border-b-4 border-amber-600 w-1/1 flex justify-center relative -top-6">
            <h2 className="text-2xl font-bold text-gray-500">{statusEntries[status]?.header}</h2>
          </div>
          {status === "forget" ? <ForgetForm /> : <AuthForm status={status} />}
          {statusEntries[status]?.message}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout