import { takeEvery, call, put } from 'redux-saga/effects';
import { setPizzaDetails } from '../store/slice/orderSlice';
import { url } from "./rootSaga";
import { setCartCount } from '../store/slice/cartSlice';
import { toast } from 'react-toastify';

function* getPizzaDetails(){
  const response = yield call (fetch, url + "/pizza", {
    method: "GET",
    mode: "cors"
  })
  if(response.ok){
    console.log("A");
    yield put(setPizzaDetails(yield response.json()))
  }
  else{
    yield put(setPizzaDetails([]))
  }
}

function* addToCart(id){
  const { token } = JSON.parse(localStorage.getItem("user")).user
  const response = yield call (fetch, url + "/addToCart?id="+id.payload, {
    method: "POST",
    mode: "cors",
    headers: {"Authorization": token}
  })
  if(response.ok){
    yield call(cartCount)
  }
}

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

function* orderSaga(){
  yield takeEvery("order/fetchPizza", getPizzaDetails)
  yield takeEvery("order/addToCart", addToCart)
  yield takeEvery("order/cartCount", cartCount)
}

export default orderSaga