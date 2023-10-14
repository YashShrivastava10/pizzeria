"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPizzaDetailsRequest } from "../store/slice/orderSlice"

const OrderPizza = () => {
  const dispatch = useDispatch()
  const { pizzaDetails } = useSelector(state => state.order);
  console.log(pizzaDetails);

  useEffect(() => {
    dispatch(fetchPizzaDetailsRequest())
  }, [])
  
  return (
    <div>Order Pizza</div>
  )
}

export default OrderPizza