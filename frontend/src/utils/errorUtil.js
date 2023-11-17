import { toast, Flip } from "react-toastify"

export const getErrorMessage = (error, toastId, errorMessage) => {
  console.log(error);
  if(!toastId) return toast.error(errorMessage)
  toast.update(toastId, { render: errorMessage, type: "error", isLoading: false, closeOnClick: true, transition: Flip })
  toast.dismiss(toastId)
}