"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCartRequest, fetchPizzaDetailsRequest } from "../store/slice/orderSlice"
import Loader from "../loading"
import { checkUser } from "../helper/authHelper"
import { toast } from 'react-toastify'
import { PizzaCard } from "../components/PizzaCard"

const OrderPizza = () => {
  const dispatch = useDispatch()
  const { pizzaDetails } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(fetchPizzaDetailsRequest())
  }, [])

  const addToCart = (id) => {
    if(checkUser()){
      dispatch(addToCartRequest(id))
    }
    else{
      toast.warn("Please Login to continue")
    }
  }

  return (
    <div className="w-full h-fit py-2 flex justify-center items-start overflow-hidden overflow-y-scroll">
      {pizzaDetails && pizzaDetails.length === 0 ? <Loader /> :
        <div className="flex flex-wrap items-start w-[90%] h-fit gap-2">
          {pizzaDetails && pizzaDetails.map((data, index) => 
            <PizzaCard index = {index} data = {data} addToCart = {addToCart} />
          )}
        </div>
      }
    </div>
  )
}

export default OrderPizza