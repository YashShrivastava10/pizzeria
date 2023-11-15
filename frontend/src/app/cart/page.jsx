"use client"

import { useDispatch, useSelector } from "react-redux"
import { Toast } from "../components/Toast"
import { useEffect, useState } from "react"
import { fetchCartDetailsRequest, fetchUpdateCartRequest } from "../store/slice/cartSlice"
import Loader from "../loading"
import Image from "next/image"
import { QuantitySelector } from "../components/QuantitySelector"

const CartCard = ({ index, data, dispatch }) => {
  const quantity = [1, 2, 3, 4, 5]
  const changeQuant = (id, qty, dispatch) => {
    dispatch(fetchUpdateCartRequest({id, qty}))
  }

  return (
    <div className="flex justify-between items-center w-full h-fit rounded-3xl shadow-lg p-2" key = {index}>
      <div className="w-1/5">
        <Image src={data.image} alt="" height={100} width={100} unoptimized style={{height: "100px", width: "100px"}}/>
      </div>
      <div className="w-1/5 text-center sm:text-md text-sm">
        <b>{data.name}</b>
      </div>
      <div className="w-1/5 text-center">
        <b>&#8377;{data.price}</b>
      </div>
      <div className="w-1/5 flex justify-center">
        <div className="hidden w-3/4 sm:flex">
          <QuantitySelector data = {data} dispatch={dispatch} quant={null}/>
        </div>
        <div className="w-3/4 sm:hidden">
          <select value={data.qty} className="w-full border rounded-lg outline-none" onChange={(e) => changeQuant(data.id, e.target.value, dispatch)}>
            {quantity.map(data => <option value={data} key={data}>{data}</option>)}
          </select>
        </div>
      </div>
      <div className="w-1/5 text-center">
        <b>&#8377;{data.qty * data.price}</b>
      </div>
    </div>
  )
}

const Cart = () => {
  const dispatch = useDispatch()
  const { loggedInStatus } = useSelector(state => state.user)
  const { cartCount, cartDetails } = useSelector(state => state.cart)
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    dispatch(fetchCartDetailsRequest())
  }, [])

  useEffect(() => {
    setSubTotal(cartDetails.reduce((acc, data) => acc + (data.qty * data.price), 0))
  }, [cartDetails])

  return(
    <>
      {loggedInStatus ? (cartDetails && !cartDetails.length) ? <Loader /> :
        <div className="w-full h-full flex flex-col md:flex-row gap-y-6 md:gap-y-0 justify-between items-start p-1 sm:p-4 overflow-hidden overflow-y-scroll">
          <div className="flex flex-col justify-start items-center w-full md:w-[74%] h-fit gap-y-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="font-bold text-2xl text-amber-600">Shopping Cart</span>
              <hr />
            </div>
            <div className="h-full md:h-[90%] w-[100%] md:overflow-hidden md:overflow-y-scroll">
              <div className="flex flex-col items-start w-[99%] h-full gap-2">
                {cartDetails.map((data, index) => 
                  <CartCard index = {index} data = {data} dispatch = {dispatch}/>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full md:w-[24%] gap-y-2">
            <span className="font-bold text-xl text-gray-500">Order Summary</span>
            <div className="border p-4 flex flex-col items-start justify-center gap-y-4 w-full">
              <div className="flex flex-col items-start justify-start w-full gap-y-1">
                <div className="order-summary">
                  <span>Total Items</span>
                  <span>{cartCount}</span>
                </div>
                <div className="order-summary">
                  <span>Sub Total</span>
                  <span>&#8377; {subTotal}</span>
                </div>
                <div className="order-summary">
                  <span>Tax</span>
                  <span>&#8377; {(subTotal * 0.18).toFixed(2)}</span>
                </div>
                <div className="order-summary">
                  <b>Total</b>
                  <b>&#8377; {(subTotal + (subTotal * 0.18)).toFixed(2)}</b>
                </div>
              </div>
              <div className="flex justify-center items-center w-full">
                <button className="btn w-full">Checkout</button>
              </div>
            </div>
          </div>
        </div> 
        : <Toast />
      }
    </>
  )
}

export default Cart