import { takeEvery, call, put } from 'redux-saga/effects';
import { setPizzaDetails } from '../store/slice/orderSlice';
import { url } from "./rootSaga";
import { cartCount, cartDetails } from './cartSaga';
import { getErrorMessage } from '../helper/errorHelper';
import { getToken } from '../helper/authHelper';

function* getPizzaDetails(){
  try{
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
  catch(error){
    yield put(setPizzaDetails([]))
    getErrorMessage(error)
  }
}

function* addToCart(payload){
  try{
    const token = getToken()
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
  catch(error){
    getErrorMessage(error)
  }
}

function* orderSaga(){
  yield takeEvery("order/fetchPizza", getPizzaDetails)
  yield takeEvery("order/addToCart", addToCart)
}

export default orderSaga