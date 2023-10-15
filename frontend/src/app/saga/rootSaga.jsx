import { all } from "redux-saga/effects"
import orderSaga from "./orderPizzaSaga"

function* rootSaga(){
  yield all([orderSaga()])
}

export default rootSaga