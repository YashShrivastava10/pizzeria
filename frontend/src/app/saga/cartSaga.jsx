import { takeEvery, put, call } from "redux-saga/effects"
import { url } from "./rootSaga"
import { setCartCount, setCartDetails } from "../store/slice/cartSlice"

export function* cartCount(){
  const { token } = JSON.parse(localStorage.getItem("user")).user
  const response = yield call (fetch, url + "/cartCount", {
    method: "GET",
    mode: "cors",
    headers: {"Authorization": token}
  })
  if(response.ok){
    const data = yield response.json()
    yield put(setCartCount(data.count))
  }
}

export function* cartDetails(){
  const { token } = JSON.parse(localStorage.getItem("user")).user
  const response = yield call (fetch, url + "/cart", {
    method: "GET",
    mode: "cors",
    headers: {"Authorization": token}
  })
  if(response.ok){
    const data = yield response.json()
    yield put(setCartDetails(data))
  }
}

function *cartSaga(){
  yield takeEvery("cart/cartCount", cartCount)
  yield takeEvery("cart/cartDetails", cartDetails)
}

export default cartSaga