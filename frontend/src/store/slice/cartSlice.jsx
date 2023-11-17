const { createSlice, createAction } = require("@reduxjs/toolkit");

export const fetchCartDetailsRequest = createAction("cart/cartDetails")
export const fetchCartCountRequest = createAction("cart/cartCount")
export const fetchUpdateCartRequest = createAction("cart/updateCart")
export const removeItemtRequest = createAction("cart/removeItem")
export const clearCartRequest = createAction("cart/clearCart")

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartCount: 0, cartDetails: [] },
  reducers: {
    setCartCount: (state, action) => ({...state, cartCount: action.payload}),
    setCartDetails: (state, action) => ({...state, cartDetails: [...action.payload]}),
  }
})

export default cartSlice.reducer

export const { setCartCount, setCartDetails } = cartSlice.actions