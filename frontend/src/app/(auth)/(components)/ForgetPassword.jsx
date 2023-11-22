"use client"

import { useState } from "react"
import EmailOTP from "./EmailOTP"
import OTPAuth from "./OTPAuth"
import ResetPassword from "./ResetPassword"

const ForgetForm = () => {

  const [step, setStep] = useState("email")
  const [email, setEmail] = useState("")

  const handleStep = (step) => {
    setStep(step)
  }

  return(
    <>
      {step === "email" && <EmailOTP handleStep={handleStep} email={email} setEmail={setEmail}/>}
      {step === "otp" && <OTPAuth handleStep={handleStep} email={email} setEmail={setEmail}/>}
      {step === "reset" && <ResetPassword email={email}/>}
    </>
  )
}

export default ForgetForm