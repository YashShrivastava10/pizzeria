import { takeEvery, call, put } from 'redux-saga/effects';
import { setPizzaDetails } from '@/store/slice/orderSlice';
import { url } from "./rootSaga";
import { cartCount, cartDetails } from './cartSaga';
import { getErrorMessage } from '@/utils/errorUtil';
import { toast } from 'react-toastify';
import { getSuccessMessage } from '@/utils/successUtil';
import { getToken } from '@/utils/authUtil';

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
    getErrorMessage(error, null, "something went wrong")
  }
}

function* orderSaga(){
  yield takeEvery("order/fetchPizza", getPizzaDetails)
  yield takeEvery("order/addToCart", addToCart)
}

export default orderSaga