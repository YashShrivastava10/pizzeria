import { createAction, createSlice } from "@reduxjs/toolkit"

export const validateResetPassword = createAction("forgetPassword/validateResetPassword")

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState: { step: "email", email: "", eOTP: 0},
  reducers: {
    setStep: (state, action) => ({...state, step: action.payload}),
    setEmail: (state, action) => ({...state, email: action.payload}),
    setEOTP: (state, action) => ({...state, eOTP: action.payload}), 
  }
})

export default forgetPasswordSlice.reducer

export const { setStep, setEmail, setEOTP } = forgetPasswordSlice.actions