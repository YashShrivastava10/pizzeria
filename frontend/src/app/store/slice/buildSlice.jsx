const { createSlice, createAction } = require("@reduxjs/toolkit");

export const fetchIngredientsRequest = createAction("order/fetchIngredients")

const buildSlice = createSlice({
  name: "build",
  initialState: {ingredients: [], ingredientsTotalPrice: 0},
  reducers: {
    setIngredients: (state, action) => ({...state, ingredients: action.payload}),
    setIngrdientsTotalPrice: (state, action) => ({...state, ingredientsTotalPrice: action.payload}),
  }
})

export default buildSlice.reducer

export const { setIngredients, setIngrdientsTotalPrice } = buildSlice.actions