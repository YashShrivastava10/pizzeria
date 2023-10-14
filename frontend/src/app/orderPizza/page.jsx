"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPizzaDetails } from "../store/slice/orderSlice"

const OrderPizza = () => {
  const dispatch = useDispatch()
  const { pizzaDetails } = useSelector(state => state.order);
  console.log(pizzaDetails);

  useEffect(() => {
    fetch("http://localhost:4000/users", {
    method: "GET",
    mode: "cors"
  })
  .then(response => {
    if(response.ok) return response.json()
    throw response
  })
  .then(data => {
    dispatch(setPizzaDetails(data))
  })
  .catch(err => alert("Some error occured"))
  }, [])
  
  return (
    <div>Order Pizza</div>
  )
}

export default OrderPizza