import { takeEvery, call, put } from 'redux-saga/effects';
import { setPizzaDetails } from '../store/slice/orderSlice';
import { url } from "./rootSaga";
import { cartCount, cartDetails } from './cartSaga';

function* getPizzaDetails(){
  const response = yield call (fetch, url + "/pizza", {
    method: "GET",
    mode: "cors"
  })
  if(response.ok){
    yield put(setPizzaDetails(yield response.json()))
    yield call(cartDetails)
  }
  else{
    yield put(setPizzaDetails([]))
  }
}

function* addToCart(payload){
  const { token } = JSON.parse(localStorage.getItem("user")).user
  const { id, status } = payload.payload
  const response = yield call (fetch, url + `/addToCart?id=${id}&status=${status}`, {
    method: "POST",
    mode: "cors",
    headers: {"Authorization": token}
  })
  if(response.ok){
    yield call(cartCount)
    yield call(cartDetails)
  }
}

function* orderSaga(){
  yield takeEvery("order/fetchPizza", getPizzaDetails)
  yield takeEvery("order/addToCart", addToCart)
}

export default orderSaga