import { setUser } from "../store/slice/userSlice"

export const clearAuth = dispatch => {
  localStorage.removeItem("user")
  dispatch(setUser({user: {}, loggedInStatus: false}))
}

export const checkUser = () => {
  console.log(localStorage.getItem("user"));
  return localStorage.getItem("user") ? true : false
}