"use client"

import { useDispatch, useSelector } from "react-redux"
import { Toast } from "../components/Toast"
import { useEffect } from "react"
import { fetchCartDetailsRequest } from "../store/slice/cartSlice"

const Cart = () => {
  const dispatch = useDispatch()
  const { user, loggedInStatus } = useSelector(state => state.user) 

  useEffect(() => {
    dispatch(fetchCartDetailsRequest())
  }, [])
  
  return (
    <>
    {loggedInStatus ? <div>Cart</div> : <Toast />}
    </>
  )
}

export default Cart