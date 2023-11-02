import { takeEvery, call, put } from 'redux-saga/effects';
import { setIngredients } from '../store/slice/buildSlice';
import { url } from "./rootSaga";

function* getIngredients(){
  const response = yield call (fetch, url + "/ingredients", {
    method: "GET",
    mode: "cors"
  })
  if(response.ok){
    yield put(setIngredients(yield response.json()))
  }
  else{
    yield put(setIngredients([]))
  }
}

function* buildSaga(){
  yield takeEvery("order/fetchIngredients", getIngredients)
}

export default buildSaga