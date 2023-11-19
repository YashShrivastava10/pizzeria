import { all } from "redux-saga/effects"
import orderSaga from "./orderPizzaSaga"
import buildSaga from "./buildPizzaSaga"
import userSaga from "./userSaga"
import cartSaga from "./cartSaga"

function* rootSaga(){
  yield all([orderSaga(), buildSaga(), userSaga(), cartSaga()])
}

export const url = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEVAPI : process.env.NEXT_PUBLIC_API

export default rootSaga