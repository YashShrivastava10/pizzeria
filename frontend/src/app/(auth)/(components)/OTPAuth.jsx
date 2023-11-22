const OTPAuth = ({handleStep}) => {
  return(
    <div>
      OTP
      <button className="btn" onClick={() => handleStep("reset")}>SUBMIT OTP</button>
    </div>
  )
}

export default OTPAuth