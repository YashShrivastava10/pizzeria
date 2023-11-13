"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCartRequest, fetchPizzaDetailsRequest } from "../store/slice/orderSlice"
import Loader from "../loading"
import { checkUser } from "../helper/authHelper"
import { toast } from 'react-toastify'
import { PizzaCard } from "../components/PizzaCard"

const OrderPizza = () => {
  const dispatch = useDispatch()
  const { pizzaDetails } = useSelector(state => state.order);

  const [addToCartId, showAddToCartId] = useState(null)
  const [quantity, setQuantity] = useState({})

  useEffect(() => {
    setQuantity(pizzaDetails.reduce((acc, value) => {
      acc[value.id] = 0
      return acc
    }, {}))
    console.log(quantity);
  }, [pizzaDetails])

  useEffect(() => {
    dispatch(fetchPizzaDetailsRequest())
  }, [])

  const addToCart = (id) => {
    setQuantity({...quantity, [id]: 1})
    if(checkUser()){
      // dispatch(addToCartRequest(id))
    }
    else{
      toast.warn("Please Login to continue")
    }
  }

  const increment = (id, newQuantity) => {
    if(newQuantity > 5) return toast.warn("Can't accept more than 5 pizzas") 
    setQuantity({...quantity, [id]: newQuantity})
  }

  const decrement = (id, newQuantity) => {
    if(newQuantity <= 0) return
    setQuantity({...quantity, [id]: newQuantity})
  }
  return (
    <div className="w-full h-fit py-2 flex justify-center items-start overflow-hidden overflow-y-scroll">
      {pizzaDetails && pizzaDetails.length === 0 ? <Loader /> :
        <div className="flex flex-wrap items-start w-[90%] h-fit gap-2">
          {pizzaDetails && pizzaDetails.map((data, index) => 
            <PizzaCard index = {index} data = {data} addToCart = {addToCart} addToCartId = {addToCartId} quantity = {quantity} increment = {increment} decrement = {decrement}/>
          )}
        </div>
      }
    </div>
  )
}

export default OrderPizza