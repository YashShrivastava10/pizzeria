import { toast, Flip } from "react-toastify"

export const getSuccessMessage = (toastId, successMessage) => { 
  toast.update(toastId, { render: successMessage, type: "success", isLoading: false, transition: Flip, autoClose: close, closeOnClick: true }) 
  toast.dismiss(toastId)
}