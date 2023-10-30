import { all } from "redux-saga/effects"
import orderSaga from "./orderPizzaSaga"
import buildSaga from "./buildPizzaSaga"

function* rootSaga(){
  yield all([orderSaga(), buildSaga()])
}

export default rootSaga