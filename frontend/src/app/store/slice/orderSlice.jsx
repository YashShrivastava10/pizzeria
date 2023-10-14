const { createSlice } = require("@reduxjs/toolkit");

const orderSlice = createSlice({
  name: "order",
  initialState: {pizzaDetails: []},
  reducers: {
    setPizzaDetails(state, action) {
      state.pizzaDetails = action.payload
    } 
  }
})

export default orderSlice.reducer

export const { setPizzaDetails } = orderSlice.actions