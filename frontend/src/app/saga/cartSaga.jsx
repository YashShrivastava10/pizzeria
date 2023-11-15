import { takeEvery, put, call } from "redux-saga/effects"
import { url } from "./rootSaga"
import { setCartCount, setCartDetails } from "../store/slice/cartSlice"
import { getToken } from "../helper/authHelper";
import { getErrorMessage } from "../helper/errorHelper";

export function* cartCount(){
  try{
    const token = getToken()
    const response = yield call (fetch, url + "/cartCount", {
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
    getErrorMessage(error)
  }
}

export function* cartDetails(){
  try{
    const token = getToken()
    const response = yield call (fetch, url + "/cart", {
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
    getErrorMessage(error)
  }
}

function* updateCart(payload){
  try{
    const token = getToken()
    const { id, qty } = payload.payload
    yield call (fetch, url + `/updateCart?id=${id}&qty=${qty}`, {
      method: "POST",
      mode: "cors",
      headers: {"Authorization": token}
    })
    yield call(cartCount)
    yield call(cartDetails)
  }
  catch(error){
    getErrorMessage(error)
  }
}

function *cartSaga(){
  yield takeEvery("cart/cartCount", cartCount)
  yield takeEvery("cart/cartDetails", cartDetails)
  yield takeEvery("cart/updateCart", updateCart)
}

export default cartSaga