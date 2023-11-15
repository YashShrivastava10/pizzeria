"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPizzaDetailsRequest } from "../store/slice/orderSlice"
import Image from "next/image"
import Loader from "../loading"
import { addToCart } from "../helper/cartHelper"
import { QuantitySelector } from "../components/QuantitySelector"
import { fetchCartDetailsRequest } from "../store/slice/cartSlice"

const PizzaCard = ({ index, data, quantity, dispatch}) => {
  const quant = quantity[data.id]
  return (
    <div key={index} className="text-black border-2 w-full md:w-[49%] h-[250px] md:h-[200px] flex flex-wrap flex-col">
      <div className="flex w-full justify-center h-full px-1 py-1">
        <div className="flex flex-col justify-around h-full items-center w-1/3">
          <b className="text-center">{data.name}</b>
          <Image src={data.type === "veg" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mNA0ot2tw1STV3ztYwLxKbKvhm7XmVbGXQ&usqp=CAU" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsNOENdNsWdiIEaDAwwOOwCSBWjiS8GFPbiA&usqp=CAU"} alt="" height={30} width={30} unoptimized priority style={{height:"30px", width: "30px"}}/>
          <b>&#8377;{data.price}</b>
        </div>
        <div className="flex flex-col justify-around items-start h-full text-xs w-2/3">
          <span>{data.description}</span>
          <span><b>Ingredients:</b> {data.ingredients.filter(element => element !== undefined).join(', ')}</span>
          <span><b>Toppings:</b> {data.topping.filter(element => element !== undefined).join(', ')}</span>
        </div>
        <div className="flex flex-col justify-evenly h-full items-center w-1/3">
          <Image src={data.image} width={120} height={150} alt="" unoptimized priority style={{height:"120px", width: "150x"}}/>
          {quant !== 0 ? 
            <div className="w-full flex">
              <QuantitySelector data = {data} dispatch={dispatch} quant={quant}/>
            </div> : 
            <button className="btn cart-btn px-[0px] text-[8px] sm:text-sm w-full text-xs md:px-[0px] md:text-xs xl:md:text-sm" onClick={() => addToCart(data.id, "add", dispatch)}>Add To Cart</button>}
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
    <div className="w-full h-fit py-2 flex justify-center items-start overflow-hidden overflow-y-scroll">
      {pizzaDetails && pizzaDetails.length === 0 ? <Loader /> :
        <div className="flex flex-wrap items-start w-[90%] h-fit gap-2">
          {pizzaDetails && pizzaDetails.map((data, index) => 
            <PizzaCard key={data.id} index = {index} data = {data} quantity = {quantity} dispatch = {dispatch}/>
          )}
        </div>
      }
    </div>
  )
}

export default OrderPizza