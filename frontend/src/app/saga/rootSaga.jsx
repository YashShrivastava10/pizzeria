const { all } = require("redux-saga/effects");
const { default: orderSaga } = require("./orderPizzaSaga");

function* rootSaga(){
  yield all([orderSaga()])
}

export default rootSaga