"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPizzaDetailsRequest } from "@/store/slice/orderSlice"
import Image from "next/image"
import { addToCartWithAuthCheck } from "@/utils/cartUtil"
import { QuantitySelector } from "@/utils/components/QuantitySelector"
import { fetchCartDetailsRequest } from "@/store/slice/cartSlice"
import OrderLoader from "./loading"

const PizzaCard = ({ index, data, quantity, dispatch}) => {
  const quant = quantity[data.id]
  return (
    <div key={index} className="orderPizza-details-container">
      <div className="orderPizza-details">
        <div className="orderPizza-details-first">
          <b className="text-center">{data.name}</b>
          <Image src={data.type === "veg" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mNA0ot2tw1STV3ztYwLxKbKvhm7XmVbGXQ&usqp=CAU" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsNOENdNsWdiIEaDAwwOOwCSBWjiS8GFPbiA&usqp=CAU"} alt="" height={30} width={30} unoptimized priority style={{height:"30px", width: "30px"}}/>
          <b>&#8377;{data.price}</b>
        </div>
        <div className="orderPizza-details-second">
          <span>{data.description}</span>
          <span><b>Ingredients:</b> {data.ingredients.filter(element => element !== undefined).join(', ')}</span>
          <span><b>Toppings:</b> {data.topping.filter(element => element !== undefined).join(', ')}</span>
        </div>
        <div className="orderPizza-details-third">
          <Image src={data.image} width={120} height={150} alt="" unoptimized priority style={{height:"120px", width: "150x"}}/>
          {quant !== 0 ? 
            <div className="w-full flex">
              <QuantitySelector data = {data} dispatch={dispatch} quant={quant}/>
            </div> : 
            <button className="btn cart-btn px-[0px] text-[8px] sm:text-sm w-full text-xs md:px-[0px] md:text-xs xl:md:text-sm" onClick={() => addToCartWithAuthCheck(data.id, "add", dispatch)}>Add To Cart</button>}
        </div>
      </div>
    </div>
  )
}

const OrderPizza = () => {
  const dispatch = useDispatch()
  const { pizzaDetails } = useSelector(state => state.order)
  const { cartDetails } = useSelector(state => state.cart)

  const [quantity, setQuantity] = useState({})

  useEffect(() => {
    if(!pizzaDetails.length) dispatch(fetchPizzaDetailsRequest())
    else dispatch(fetchCartDetailsRequest())
  }, [])

  useEffect(() => {
    setQuantity(pizzaDetails.reduce((acc, pizzaItem) => {
      const cartItem = cartDetails.find(item => item.id === pizzaItem.id);
      acc[pizzaItem.id] = cartItem ? cartItem.qty : 0;
      return acc;
    }, {}));
  }, [cartDetails, pizzaDetails])

  return (
    <>
      {pizzaDetails && !pizzaDetails.length ? <OrderLoader /> : 
        <div className="w-full h-fit py-2 flex justify-center items-start overflow-hidden overflow-y-scroll">
          <div className="orderPizza-container">
            {pizzaDetails && pizzaDetails.map((data, index) => 
              <PizzaCard key={data.id} index = {index} data = {data} quantity = {quantity} dispatch = {dispatch}/>
            )}
          </div>
        </div>
      }
    </>
  )
}

export default OrderPizza