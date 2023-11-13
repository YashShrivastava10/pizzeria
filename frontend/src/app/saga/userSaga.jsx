import { toast } from "react-toastify";
import { setUser } from "../store/slice/userSlice";
import { url } from "./rootSaga";
import { takeEvery, call, put } from "redux-saga/effects"
import { cartCount } from "./orderPizzaSaga";

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
      const token = data["token"]
      const user = {...data["data"], token}
      const details = { user: (({_id, ...user}) => user)(user), loggedInStatus: true }
      localStorage.setItem("user", JSON.stringify(details));
      yield put(setUser(details))
      yield call(cartCount)
      toast.success("Logged In!")
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
      const token = data["token"]
      const user = user.payload
      yield put(setUser({ user: {user, token}, loggedInStatus: true }))
      toast.success("User created successfully!")
    }
  }
}

function* userSaga(){
  yield takeEvery("user/loginRequest", login)
  yield takeEvery("user/signUpRequest", signUp)
}

export default userSaga