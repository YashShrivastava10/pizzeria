import { takeEvery, put, call } from "redux-saga/effects"
import { url } from "./rootSaga"
import { setCartCount, setCartDetails } from "@/store/slice/cartSlice"
import { getToken } from "@/utils/authUtil";
import { getErrorMessage } from "@/utils/errorUtil";
import { setLoading } from "@/store/slice/loadingSlice";

export function* cartCount(){
  try{
    const token = getToken()
    const response = yield call (fetch, url + "/pizza/cartCount", {
      method: "GET",
      mode: "cors",
      headers: {"Authorization": token}
    })
    if(response.ok){
      const data = yield response.json()
      yield put(setCartCount(data.count))
    }
    else{
      yield put(setCartCount(0))
    }
  }
  catch(error){
    yield put(setCartCount(0))
    getErrorMessage(error, null, "Somethig went wrong")
  }
}

export function* cartDetails(){
  try{
    const token = getToken()
    const response = yield call (fetch, url + "/pizza/cart", {
      method: "GET",
      mode: "cors",
      headers: {"Authorization": token}
    })
    if(response.ok){
      const data = yield response.json()
      yield put(setCartDetails(data))
    }
    else{
      yield put(setCartDetails([]))
    }
  }
  catch(error){
    yield put(setCartDetails([]))
    getErrorMessage(error, null, "Something went wrong")
  }
}

function* updateCart(payload){
  try{
    yield put(setLoading(true))
    const token = getToken()
    const { id, qty } = payload.payload
    yield call (fetch, url + `/pizza/updateCart?id=${id}&qty=${qty}`, {
      method: "POST",
      mode: "cors",
      headers: {"Authorization": token}
    })
    yield call(cartCount)
    yield call(cartDetails)
    yield put(setLoading(false))
  }
  catch(error){
    getErrorMessage(error, null, "Somethig went wrong")
    yield put(setLoading(false))
  }
}

function* removeItem(payload){
  try{
    yield put(setLoading(true))
    const token = getToken()
    const id = payload.payload
    yield call (fetch, url + `/pizza/removeItem?id=${id}`, {
      method: "GET",
      mode: "cors",
      headers: {"Authorization": token}
    })
    yield call(cartCount)
    yield call(cartDetails)
    yield put(setLoading(false))
  }
  catch(error){
    getErrorMessage(error, null, "Somethig went wrong")
    yield put(setLoading(false))
  }
}

function* clearCart(){
  try{
    yield put(setLoading(true))
    const token = getToken()
    yield call (fetch, url + "/pizza/clearCart", {
      method: "GET",
      mode: "cors",
      headers: {"Authorization": token}
    })
    yield call(cartCount)
    yield call(cartDetails)
    yield put(setLoading(false))
  }
  catch(error){
    getErrorMessage(error, null, "Somethig went wrong")
    yield put(setLoading(false))
  }
}

function *cartSaga(){
  yield takeEvery("cart/cartCount", cartCount)
  yield takeEvery("cart/cartDetails", cartDetails)
  yield takeEvery("cart/updateCart", updateCart)
  yield takeEvery("cart/removeItem", removeItem)
  yield takeEvery("cart/clearCart", clearCart)
}

export default cartSaga