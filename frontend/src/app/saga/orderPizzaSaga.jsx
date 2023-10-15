import { takeEvery, call, put } from 'redux-saga/effects';
import { setPizzaDetails } from '../store/slice/orderSlice';

function* getPizzaDetails(){
  const response = yield call (fetch, "https://pizzeria-b5if.vercel.app/pizza", {
    method: "GET",
    mode: "cors"
  })
  if(response.ok){
    yield put(setPizzaDetails(yield response.json()))
  }
  else{
    yield put(setPizzaDetails([]))
  }
}

function* orderSaga(){
  yield takeEvery("order/fetchPizza", getPizzaDetails)
}

export default orderSaga