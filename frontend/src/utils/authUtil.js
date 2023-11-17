"use client"
import { setUser } from "@/store/slice/userSlice"

export const clearAuth = dispatch => {
  localStorage.removeItem("user")
  dispatch(setUser({user: {}, loggedInStatus: false}))
}

export const checkUser = () => {
  // console.log(localStorage);
  if (typeof window !== 'undefined'){
    return localStorage.getItem("user") ? true : false
  }
  else{
    return false
  }
}

export const getToken = () => {
  const { token } = JSON.parse(localStorage.getItem("user"))?.user || {};
  return token
}