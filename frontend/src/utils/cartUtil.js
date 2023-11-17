import { toast } from "react-toastify"
import { checkUser } from "./authUtil"
import { addToCartRequest } from "@/store/slice/orderSlice"
import { clearCartRequest, removeItemtRequest } from "@/store/slice/cartSlice"

export const addToCartWithAuthCheck = (id, status, dispatch) => {
  const isAuth = checkUser();

  if (isAuth)
    addToCart(id, status, dispatch);
  else
    toast.warn("Please Login to continue");
};

export const addToCart = (id, status, dispatch) => {
  dispatch(addToCartRequest({id, status}))
}

export const increment = (id, newQuantity, dispatch) => {
  if(newQuantity > 5) return toast.warn("Can't accept more than 5 pizzas") 
  addToCart(id, "inc", dispatch)
}

export const decrement = (id, newQuantity, dispatch) => {
  if(newQuantity < 0) return
  addToCart(id, "dec", dispatch)
}

export const removeItem = (id, dispatch) => {
  dispatch(removeItemtRequest(id))
}

export const clearCart = dispatch => {
  dispatch(clearCartRequest())
}