import { toast } from "react-toastify";
import { setUser } from "@/store/slice/userSlice";
import { url } from "./rootSaga";
import { takeEvery, call, put } from "redux-saga/effects"
import { cartCount } from "./cartSaga";
import { getErrorMessage } from "@/utils/errorUtil";
import { getSuccessMessage } from "@/utils/successUtil";

function* login(user) {
  const toastId = toast.loading("Logging In...")
  try {
    const response = yield call(fetch, url + "/login", {
      mode: "cors",
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user.payload)
    })
    if (response.ok) {
      const data = yield response.json()
      if (data.success) {
        const token = data["token"]
        const user = { ...data["data"], token }
        const details = { user: (({ _id, ...user }) => user)(user), loggedInStatus: true }
        localStorage.setItem("user", JSON.stringify(details));
        yield put(setUser(details))
        yield call(cartCount)
        getSuccessMessage(toastId, "Logged In")
      }
      else {
        getErrorMessage(null, toastId, data.message)
      }
    }
  }
  catch (error) {
    getErrorMessage(error, toastId, "Something Went Wrong !!")
  }
}

function* signUp(user) {
  const toastId = toast.loading("Creating account...")
  try {
    const response = yield call(fetch, url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user.payload)
    })
    if (response.ok) {
      const data = yield response.json()
      if (data.success) {
        const token = data["token"]
        const newUser = user.payload
        const { email, name } = newUser
        const details = { user: { email, name, token }, loggedInStatus: true }
        localStorage.setItem("user", JSON.stringify(details))
        yield put(setUser(details))
        yield call(cartCount)
        getSuccessMessage(toastId, "Account Created")
      }
      else {
        getErrorMessage(null, toastId, data.message)
      }
    }
  }
  catch (error) {
    getErrorMessage(error, toastId, "Something Went Wrong !!")
  }
}

function* userSaga() {
  yield takeEvery("user/loginRequest", login)
  yield takeEvery("user/signUpRequest", signUp)
}

export default userSaga