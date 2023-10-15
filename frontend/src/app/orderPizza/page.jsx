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
    <div className="w-full h-full px-2 py-1 flex justify-center items-center overflow-hidden overflow-y-scroll">
      {!pizzaDetails && <>Loading</>}
      <div className="flex flex-wrap w-[90%] h-full gap-2">
      {pizzaDetails && pizzaDetails.map((data, index) => 
        <div key={index} className="text-black border-2 w-[49%] h-fit flex flex-wrap flex-col">
          <span>Name: {data.name}</span>
          <span>Description: {data.description}</span>
          <span>Image: {data.image}</span>
          <span>Price: {data.price}</span>
          <span>Type: {data.type}</span>
          <span>Ingredients: {data.ingredients}</span>
          <span>Toppings: {data.toppings}</span>
        </div>)}
        </div>
    </div>
  )
}

export default OrderPizza