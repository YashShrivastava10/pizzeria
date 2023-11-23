import Image from "next/image"
import log from "../../../../public/log.png"
import Link from "next/link"
import { sendEmail } from "@/utils/sendEmail"
import { generateOTP } from "@/utils/authUtil"
import { useDispatch, useSelector } from "react-redux"
import { setEOTP, setEmail, setStep } from "@/store/slice/forgetPasswordSlice"
import { toast } from "react-toastify"

const EmailOTP = () => {

  const dispatch = useDispatch()
  const { email, eOTP } = useSelector(state => state.forgetPassword)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const otp = generateOTP(eOTP)
    const text = `Your OTP: ${otp}`
    dispatch(setEOTP(otp))
    const result = await sendEmail(email, text)
    if(result.id)
      dispatch(setStep("otp"))
    else
      toast.error("Please clcik again");
  }

  return (
    <form className="flex flex-col jutsify-center items-center w-[80%] gap-y-2" onSubmit={handleSubmit}>
      <span className="text-sm text-gray-500">Don't wory! Enter your email address below, and we'll send you a One-Time Password.</span>
      <input className="form-input" id="name" type="email" value={email} placeholder="Email" required onChange={(e) => dispatch(setEmail(e.target.value))}/>
      <div className="w-full">
        <button className="w-full rounded-3xl p-1 bg-blue-800 text-white font-bold hover:bg-amber-600 hover:rounded transition-all duration-300 ease-in" type="submit">SEND OTP</button>
      </div>
      <div className="absolute top-6">
        <Link className="flex justify-center items-center gap-x-1 p-1" href="/login">
          <Image src={log} alt="X" height='100%' width='100%' />
          <span className="text-gray-500 font-bold">BACK</span>
        </Link>
      </div>
    </form>
  )
}

export default EmailOTP