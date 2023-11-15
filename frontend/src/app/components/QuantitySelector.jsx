import { increment, decrement } from "../helper/cartHelper"


export const QuantitySelector = ({data, dispatch, quant}) => {
  return (
    <>
      <button className="rounded-l-full qty-btn" onClick={() => decrement(data.id, quant ? quant - 1 : data.qty - 1, dispatch)}>-</button>
      <span className="border-t border-b border w-full text-center">{quant ? quant : data.qty}</span>
      <button className="rounded-r-full qty-btn" onClick={() => increment(data.id, quant ? quant + 1 : data.qty + 1, dispatch)}>+</button>
    </>
  )
}