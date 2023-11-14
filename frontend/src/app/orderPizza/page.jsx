"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCartRequest, fetchPizzaDetailsRequest } from "../store/slice/orderSlice"
import Image from "next/image"
import Loader from "../loading"
import { checkUser } from "../helper/authHelper"
import { toast } from 'react-toastify'

const PizzaCard = ({ index, data, addToCart, quantity, increment, decrement}) => {
  const quant = quantity[data.id]
  return (
    <div key={index} className="text-black border-2 w-full md:w-[49%] h-[250px] md:h-[200px] flex flex-wrap flex-col">
      <div className="flex w-full justify-center h-full px-1 py-1">
        <div className="flex flex-col justify-around h-full items-center w-1/3">
          <b className="text-center">{data.name}</b>
          <Image src={data.type === "veg" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mNA0ot2tw1STV3ztYwLxKbKvhm7XmVbGXQ&usqp=CAU" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsNOENdNsWdiIEaDAwwOOwCSBWjiS8GFPbiA&usqp=CAU"} height={30} width={30} />
          <b>&#8377;{data.price}</b>
        </div>
        <div className="flex flex-col justify-around items-start h-full text-xs w-2/3">
          <span>{data.description}</span>
          <span><b>Ingredients:</b> {data.ingredients.filter(element => element !== undefined).join(', ')}</span>
          <span><b>Toppings:</b> {data.topping.filter(element => element !== undefined).join(', ')}</span>
        </div>
        <div className="flex flex-col justify-evenly h-full items-center w-1/3">
          <Image src={data.image} width={150} height={150} alt="" />
          {quant !== 0 ? 
            <div className="w-full flex">
              <button className="rounded-l-full qty-btn" onClick={() => decrement(data.id, quant - 1)}>-</button>
              <span className="border-t border-b border w-full text-center">{quantity[data.id]}</span>
              <button className="rounded-r-full qty-btn" onClick={() => increment(data.id, quant + 1)}>+</button>
            </div> : 
            <button className="btn cart-btn px-[0px] text-[8px] sm:text-sm w-full text-xs md:px-[0px] md:text-xs xl:md:text-sm" onClick={() => addToCart(data.id, "add")}>Add To Cart</button>}
        </div>
      </div>
    </div>
  )
}

const OrderPizza = () => {
  const dispatch = useDispatch()
  const { pizzaDetails } = useSelector(state => state.order)
  const { cartDetails } = useSelector(state => state.cart)

  const [addToCartId, showAddToCartId] = useState(null)
  const [quantity, setQuantity] = useState({})

  useEffect(() => {
    console.log(cartDetails);
    setQuantity(pizzaDetails.reduce((acc, pizzaItem) => {
      const cartItem = cartDetails.find(item => item.id === pizzaItem.id);
      acc[pizzaItem.id] = cartItem ? cartItem.qty : 0;
      return acc;
    }, {}));
  }, [cartDetails])

  useEffect(() => {
    if(pizzaDetails.length === 0)
      dispatch(fetchPizzaDetailsRequest())
  }, [])

  const addToCart = (id, status) => {
    // setQuantity({...quantity, [id]: 1})
    if(checkUser()){
      dispatch(addToCartRequest({id, status}))
    }
    else{
      toast.warn("Please Login to continue")
    }
  }

  const increment = (id, newQuantity) => {
    if(newQuantity > 5) return toast.warn("Can't accept more than 5 pizzas") 
    addToCart(id, "inc")
    // setQuantity({...quantity, [id]: newQuantity})
  }

  const decrement = (id, newQuantity) => {
    console.log(quantity);
    if(newQuantity < 0) return
    addToCart(id, "dec")
    // setQuantity({...quantity, [id]: newQuantity})
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