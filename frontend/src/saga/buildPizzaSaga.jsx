import { takeEvery, call, put } from 'redux-saga/effects';
import { setIngredients } from '@/store/slice/buildSlice';
import { url } from "./rootSaga";
import { getErrorMessage } from '../utils/errorUtil';
import { toast } from 'react-toastify';
import { getSuccessMessage } from '@/utils/successUtil';

function* getIngredients(){
  const toastId = toast.loading("Fetching Topping details...")
  try{
    const response = yield call (fetch, url + "/pizza/ingredients", {
      method: "GET",
      mode: "cors"
    })
    if(response.ok){
      yield put(setIngredients(yield response.json()))
      getSuccessMessage(toastId, null)
    }
    else{
      yield put(setIngredients([]))
      getErrorMessage(null, toastId, "Something went wrong")
    }
  }
  catch(error){
    yield put(setIngredients([]))
    getErrorMessage(null, toastId, "Something went wrong")
  }
}

function* buildSaga(){
  yield takeEvery("order/fetchIngredients", getIngredients)
}

export default buildSaga