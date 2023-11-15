import { takeEvery, call, put } from 'redux-saga/effects';
import { setIngredients } from '../store/slice/buildSlice';
import { url } from "./rootSaga";
import { getErrorMessage } from '../helper/errorHelper';

function* getIngredients(){
  try{
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
  catch(error){
    yield put(setIngredients([]))
    getErrorMessage(error)
  }
}

function* buildSaga(){
  yield takeEvery("order/fetchIngredients", getIngredients)
}

export default buildSaga