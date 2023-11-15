import { toast } from "react-toastify"

export const getErrorMessage = (error) => {
  console.log(error)
  toast.error("Something went wrong")
}