"use client"

import { useDispatch, useSelector } from "react-redux"
import { Toast } from "@/utils/components/Toast"
import { useEffect, useState } from "react"
import { fetchCartDetailsRequest, fetchUpdateCartRequest } from "@/store/slice/cartSlice"
import Image from "next/image"
import { QuantitySelector } from "@/utils/components/QuantitySelector"
import CartLoader from "./loading"

const CartCard = ({ index, data, dispatch }) => {
  const quantity = [1, 2, 3, 4, 5]
  const changeQuant = (id, qty, dispatch) => {
    dispatch(fetchUpdateCartRequest({ id, qty }))
  }

  return (
    <div className="flex justify-between items-center w-full h-fit rounded-3xl shadow-lg p-2" key={index}>
      <div className="w-1/5">
        <Image src={data.image} alt="" height={100} width={100} unoptimized style={{ height: "100px", width: "100px" }} />
      </div>
      <div className="w-1/5 text-center sm:text-md text-sm">
        <b>{data.name}</b>
      </div>
      <div className="w-1/5 text-center">
        <b>&#8377;{data.price}</b>
      </div>
      <div className="w-1/5 flex justify-center">
        <div className="hidden w-3/4 sm:flex">
          <QuantitySelector data={data} dispatch={dispatch} quant={null} />
        </div>
        <div className="w-3/4 sm:hidden">
          <select value={data.qty} className="w-full border rounded-lg outline-none" onChange={(e) => changeQuant(data.id, e.target.value, dispatch)}>
            {quantity.map(item => <option value={item} key={item}>{item}</option>)}
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
  const [isMounted, setIsMounted] = useState(false) // For Hydartion

  // For the first time isMounted will be false, so in server and in client everything will be null
  // After first render, useEffect will run and isMounted to true to render the HTML
  useEffect(() => {
    setIsMounted(true)
    dispatch(fetchCartDetailsRequest())
  }, [])

  useEffect(() => {
    setSubTotal(cartDetails.reduce((acc, data) => acc + (data.qty * data.price), 0))
  }, [cartDetails])

  if (!isMounted) return null

  return (
    <>
      {!loggedInStatus && <Toast />}
      {loggedInStatus && cartCount === 0 &&
        <div className="text-4xl text-amber-600 font-bold flex justify-center items-center h-full w-full">Empty Cart</div>}
      {loggedInStatus && cartCount && (cartDetails && !cartDetails.length) && <CartLoader />}
      {loggedInStatus && cartCount && (cartDetails && cartDetails.length) &&
        <div className="cart-container">
          <div className="shoppingCart-container">
            <div className="shoppingCart-heading">
              <span className="shoppingCart-text">Shopping Cart</span>
              <hr />
            </div>
            <div className="shoppingCart-details-container">
              <div className="shoppingCart-details">
                {cartDetails.map((data, index) =>
                  <CartCard key={index} index={index} data={data} dispatch={dispatch} />
                )}
              </div>
            </div>
          </div>
          <div className="orderSummary-container">
            <span className="orderSummary-heading">Order Summary</span>
            <div className="orderSummary-details-container">
              <div className="orderSummary-details">
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
              <div className="orderSummary-button">
                <button className="btn w-full tracking-widest md:tracking-normal">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Cart