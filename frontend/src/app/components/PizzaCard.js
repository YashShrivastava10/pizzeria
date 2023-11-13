import Image from "next/image"

export const PizzaCard = ({ index, data, addToCart, quantity, increment, decrement}) => {
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
              <button className="rounded-l-full qty-btn" onClick={() => increment(data.id, quant - 1)}>-</button>
              <span className="border-t border-b border w-full text-center">{quantity[data.id]}</span>
              <button className="rounded-r-full qty-btn" onClick={() => increment(data.id, quant + 1)}>+</button>
            </div> : 
            <button className="btn cart-btn px-[0px] text-[8px] sm:text-sm w-full text-xs md:px-[0px] md:text-xs xl:md:text-sm" onClick={() => addToCart(data.id)}>Add To Cart</button>}
        </div>
      </div>
    </div>
  )
}