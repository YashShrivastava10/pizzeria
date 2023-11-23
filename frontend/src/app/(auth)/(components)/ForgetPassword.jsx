"use client"

import { useState } from "react"
import EmailOTP from "./EmailOTP"
import OTPAuth from "./OTPAuth"
import ResetPassword from "./ResetPassword"
import { useSelector } from "react-redux"

const ForgetForm = () => {

  const { step } = useSelector(state => state.forgetPassword)

  const handleStep = (step) => {
    setStep(step)
  }

  return(
    <>
      {step === "email" && <EmailOTP />}
      {step === "otp" && <OTPAuth />}
      {step === "reset" && <ResetPassword />}
    </>
  )
}

export default ForgetForm