import { toast } from "react-toastify";
import { setUser } from "@/store/slice/userSlice";
import { url } from "./rootSaga";
import { takeEvery, call, put } from "redux-saga/effects"
import { cartCount } from "./cartSaga";
import { getErrorMessage } from "@/utils/errorUtil";
import { getSuccessMessage } from "@/utils/successUtil";
import { setLoading } from "@/store/slice/loadingSlice";

function* login(user) {
  const toastId = toast.loading("Logging In...")
  try {
    yield put(setLoading(true))
    const response = yield call(fetch, url + "/auth/login", {
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
        yield put(setLoading(false))
        getSuccessMessage(toastId, "Logged In")
      }
      else {
        getErrorMessage(null, toastId, data.message)
        yield put(setLoading(false))
      }
    }
  }
  catch (error) {
    getErrorMessage(error, toastId, "Something Went Wrong !!")
    yield put(setLoading(false))
  }
}

function* signUp(user) {
  const toastId = toast.loading("Creating account...")
  try {
    yield put(setLoading(true))
    const response = yield call(fetch, url + "/auth/signUp", {
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
        yield put(setLoading(false))
        getSuccessMessage(toastId, "Account Created")
      }
      else {
        getErrorMessage(null, toastId, data.message)
        yield put(setLoading(false))
      }
    }
  }
  catch (error) {
    getErrorMessage(error, toastId, "Something Went Wrong !!")
    yield put(setLoading(false))
  }
}

function* resetPassword(payload) {
  const toastId = toast.loading("Changing Password...")
  try {
    yield put(setLoading(true))
    const response = yield call(fetch, url + "/auth/resetPassword", {
      mode: "cors",
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload.payload)
    })
    if (response.ok) {
      const data = yield response.json()
      if (data.success) {
        getSuccessMessage(toastId, "Password changed successfully")
        window.location.href = "/login"
      }
      else {
      }
    }
  }
  catch (error) {
    getErrorMessage(error, toastId, "Something Went Wrong !!")
    yield put(setLoading(false))
  }
}

function* userSaga() {
  yield takeEvery("user/loginRequest", login)
  yield takeEvery("user/signUpRequest", signUp)
  yield takeEvery("forgetPassword/validateResetPassword", resetPassword)
}

export default userSaga