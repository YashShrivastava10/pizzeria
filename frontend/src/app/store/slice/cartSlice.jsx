const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartCount: 0 },
  reducers: {
    setCartCount: (state, action) => ({...state, cartCount: action.payload}),
  }
})

export default cartSlice.reducer

export const { setCartCount } = cartSlice.actions