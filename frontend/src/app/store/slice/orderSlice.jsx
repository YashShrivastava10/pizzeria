const { createSlice, createAction } = require("@reduxjs/toolkit");

export const fetchPizzaDetailsRequest = createAction("order/fetchPizza")
export const addToCartRequest = createAction("order/addToCart")
export const cartCountRequest = createAction("order/cartCount")

const orderSlice = createSlice({
  name: "order",
  initialState: {pizzaDetails: []},
  reducers: {
    setPizzaDetails: (state, action) => ({...state, pizzaDetails: [...action.payload]}),
  }
})

export default orderSlice.reducer

export const { setPizzaDetails } = orderSlice.actions