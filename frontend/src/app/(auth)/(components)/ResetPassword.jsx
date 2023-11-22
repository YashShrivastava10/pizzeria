import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const ResetPassword = () => {
  const router = useRouter()
  const [password, setPassword] = useState({pass: "", rePass: ""})

  const handlePassword = (name, value) => {
    const updatedPaswword = { ...password, [name]: value }
    setPassword(updatedPaswword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password.pass === password.rePass){
      toast.success("Equal Password")
      router.push("/login")
    }
    else toast.error("Password does not match")
  }

  return(
    <form className="flex flex-col jutsify-center items-center w-[80%] gap-y-2" onSubmit={handleSubmit}>
      <input className="form-input" type="password" name="pass" value={password.pass} placeholder="New Password" required onChange={(e) => handlePassword(e.target.name, e.target.value)}/>
      <input className="form-input" type="password" name="rePass" value={password.rePass} placeholder="Re-type New Password" required onChange={(e) => handlePassword(e.target.name, e.target.value)}/>
      <button className="w-full rounded-3xl p-1 bg-blue-800 text-white font-bold hover:bg-amber-600 hover:rounded transition-all duration-300 ease-in">Rest Password</button>
    </form>
  )
}

export default ResetPassword