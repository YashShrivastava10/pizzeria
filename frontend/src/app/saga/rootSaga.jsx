import { all } from "redux-saga/effects"
import orderSaga from "./orderPizzaSaga"
import buildSaga from "./buildPizzaSaga"
import userSaga from "./userSaga"

function* rootSaga(){
  yield all([orderSaga(), buildSaga(), userSaga()])
}

export let url = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEVAPI : process.env.NEXT_PUBLIC_API

export default rootSaga