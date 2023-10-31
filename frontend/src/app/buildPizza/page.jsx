"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchIngredientsRequest, setIngrdientsTotalPrice } from "../store/slice/buildSlice"
import Image from "next/image"
import Loader from "../loading"

const BuildPizza = () => {
  const { ingredients, ingredientsTotalPrice } = useSelector(state => state.build)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIngredientsRequest())
  }, [])

  const handleIngredientsPrice = (price, id) => {
    const ele = document.querySelector(`#ing-price-${id}`)
    if(ele.checked){
      dispatch(setIngrdientsTotalPrice(ingredientsTotalPrice + +price))
    }
    else{
      dispatch(setIngrdientsTotalPrice(ingredientsTotalPrice - +price))
    }
  }

  return (
    <div className="w-full h-fit px-2 py-2 flex justify-center items-start overflow-hidden overflow-y-scroll">
      {ingredients && ingredients.length === 0 ? <Loader /> : 
      <div className="flex flex-col justify-start items-center w-full gap-y-2">
      <span className="text-xs">Pizzeria now gives you options to build yourn own pizza. Cutomize your pizza by choosing ingredients from the list given below</span>
      <table className="flex flex-col border border-collapse">
      {ingredients.map(ing => 
        <tr className="flex items-center h-[50px] ingredients-tr" key={ing.id}>
          <td className="border w-[130px] h-full flex justify-start items-center px-2"><Image src={ing.image} width={50} height={50} style={{height: "100%"}} unoptimized /></td>
          <td className="flex justify-center items-center gap-x-2 w-[130px] h-full border text-sm"><b>{ing.tname}</b><b>&#8377;{ing.price}</b></td>
          <td className="flex justify-start items-center gap-x-2 w-[100px] h-full border text-sm pl-2" justify-center items-center><input type="checkbox" value={ing.price} id={`ing-price-${ing.id}`} onChange={() => handleIngredientsPrice(ing.price, ing.id)}/><label className="text-amber-500" htmlFor={`ing-price-${ing.id}`}>Add</label></td>
        </tr>)}
        <tr className="p-2"><b className="text-sky-800">Total Cost: {ingredientsTotalPrice}</b></tr>
        <tr className="flex justify-center items-center py-2"><button className="btn build-btn">Build Pizza</button></tr>
      </table>
      </div>
      }
    </div>
  )
}

export default BuildPizza