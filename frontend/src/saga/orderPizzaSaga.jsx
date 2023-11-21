import { takeEvery, call, put } from 'redux-saga/effects';
import { setPizzaDetails } from '@/store/slice/orderSlice';
import { url } from "./rootSaga";
import { cartCount, cartDetails } from './cartSaga';
import { getErrorMessage } from '@/utils/errorUtil';
import { getToken } from '@/utils/authUtil';
import { setLoading } from '@/store/slice/loadingSlice';

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
    getErrorMessage(error, null, "Something went wrong")
  }
}

function* addToCart(payload){
  try{
    yield put(setLoading(true))
    const token = getToken()
    const { id, status } = payload.payload
    const response = yield call (fetch, url + `/pizza/addToCart?id=${id}&status=${status}`, {
      method: "POST",
      mode: "cors",
      headers: {"Authorization": token}
    })
    if(response.ok){
      yield call(cartCount)
      yield call(cartDetails)
      yield put(setLoading(false))
    }
  }
  catch(error){
    getErrorMessage(error, null, "something went wrong")
    yield put(setLoading(false))
  }
}

function* orderSaga(){
  yield takeEvery("order/fetchPizza", getPizzaDetails)
  yield takeEvery("order/addToCart", addToCart)
}

export default orderSaga