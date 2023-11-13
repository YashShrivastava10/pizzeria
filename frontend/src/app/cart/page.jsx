"use client"

import { useSelector } from "react-redux"
import { Toast } from "../components/Toast"

const Cart = () => {
  const { user, loggedInStatus } = useSelector(state => state.user) 

  return (
    <>
    {loggedInStatus ? <div>Cart</div> : <Toast />}
    </>
  )
}

export default Cart