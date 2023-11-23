import { setStep } from "@/store/slice/forgetPasswordSlice";
import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const OTPAuth = () => {

  const dispatch = useDispatch()
  const { email, eOTP } = useSelector(state => state.forgetPassword)
  const [otp, setOtp] = useState(Array(4).fill(''));
  const inputRefs = useRef(new Array(4).fill(null).map(() => React.createRef()));

  const handleChange = (value, index) => {
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;

      if (value && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      } else if (!value && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }

      return newOtp;
    });
  };

  const handleKeyDown = (key, index) => {
    if (key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const updateOTP = parseInt(otp.join(""))
    console.log(eOTP, updateOTP);
    if(updateOTP === eOTP) dispatch(setStep("reset"))
    else toast.error("OTP Incorrect")
  }
  return(
    <form className="flex flex-col gap-y-4 w-[80%] justify-center items-center" onSubmit={handleSubmit}>
      <span className="text-gray-500 text-center">
        Please enter the OTP, sent to <b>{email}</b>.
      </span>
      <div className="flex w-full justify-evenly">
      {otp.map((digit, index) => (
        <input className="h-[40px] aspect-square rounded-full border-amber-600 border-2 outline-none caret-amber-600 text-center text-amber-600 text-xl"
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          required
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e.key, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
      </div>
      <button className="w-[80%] rounded-3xl p-1 bg-blue-800 text-white font-bold hover:bg-amber-600 hover:rounded transition-all duration-300 ease-in">SUBMIT OTP</button>
    </form>
  )
}

export default OTPAuth