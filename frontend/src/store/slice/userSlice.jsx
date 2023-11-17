const { createSlice, createAction } = require("@reduxjs/toolkit");

export const loginRequest = createAction("user/loginRequest")
export const signUpRequest = createAction("user/signUpRequest")

const userSlice = createSlice({
  name: "user",
  initialState: {user: {}, loggedInStatus: false},
  reducers: {
    setUser: (state, action) => ({ ...state, ...action.payload }),
  }
})

export default userSlice.reducer

export const { setUser } = userSlice.actions