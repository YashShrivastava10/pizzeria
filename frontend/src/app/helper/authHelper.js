import { setUser } from "../store/slice/userSlice"

export const clearAuth = dispatch => {
  localStorage.setItem("user", null)
    dispatch(setUser({user: {}, loggedInStatus: false}))
}

export const checkUser = () => {
  return localStorage.getItem("user") !== "null" ? true : false
}