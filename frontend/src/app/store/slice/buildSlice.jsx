const { createSlice, createAction } = require("@reduxjs/toolkit");

export const fetchIngredientsRequest = createAction("order/fetchIngredients")

const buildSlice = createSlice({
  name: "build",
  initialState: {ingredients: []},
  reducers: {
    setIngredients(state, action) {
      state.ingredients = action.payload
    } 
  }
})

export default buildSlice.reducer

export const { setIngredients } = buildSlice.actions