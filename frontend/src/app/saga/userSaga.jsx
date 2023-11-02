import { setUser } from "../store/slice/userSlice";
import { url } from "./rootSaga";
import { takeEvery, call, put } from "redux-saga/effects"

function* login(user){
  const response = yield call(fetch, url + "/login", {
    mode: "cors",
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user.payload)
  })
  if(response.ok){
    const data = yield response.json()
     if(data.success){
      const user = data["data"]
      yield put(setUser({ user: (({_id, ...user}) => user)(user), loggedInStatus: true }))
    }
  }
}

function* signUp(user){
  const response = yield call(fetch, url + "/signUp", {
    mode: "cors",
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user.payload)
  })
  if(response.ok){
    const data = yield response.json()
    if(data.success){
      yield put(setUser({ user: user.payload, loggedInStatus: true }))
    }
  }
}

function* userSaga(){
  yield takeEvery("user/loginRequest", login)
  yield takeEvery("user/signUpRequest", signUp)
}

export default userSaga