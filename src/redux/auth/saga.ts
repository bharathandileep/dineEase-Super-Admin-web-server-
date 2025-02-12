import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

import { authApiResponseSuccess, authApiResponseError } from "./actions";

import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  forgotPassword as forgotPasswordApi,
} from "../../helpers/api/auth";

// constants
import { AuthActionTypes } from "./constants";
import { APICore, setAuthorization } from "../../helpers/api/apiCore";

interface UserData {
  payload: {
    username: string;
    password: string;
    fullname: string;
    email: string;
  };
  type: string;
}

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
  function* login({
    payload: { username, password },
    type,
  }: UserData): SagaIterator {
      console.log("🔄 Saga triggered with:");
    try {
      const response = yield call(loginApi, { username, password });
      const user = response.data;
    // setLoggedInUser(user);
    // setAuthorization(user["token"]);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
  try {
    yield call(logoutApi);
    api.setLoggedInUser(null);
    setAuthorization(null);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
  }
}

function* signup({
  payload: { fullname, email, password },
}: UserData): SagaIterator {
  try {
    const response = yield call(signupApi, { fullname, email, password });
    const user = response.data;
    // api.setLoggedInUser(user);
    // setAuthorization(user['token']);
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

function* forgotPassword({ payload: { username } }: UserData): SagaIterator {
  try {
    const response = yield call(forgotPasswordApi, { username });
    yield put(
      authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data)
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
  }
}
export function* watchLoginUser() {
  console.log('👀 Login watcher started');
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

function* authSaga() {
  console.log('🌱 Auth saga initialized');
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchForgotPassword),
  ]);
}

export default authSaga;
function setLoggedInUser(user: any) {
    throw new Error("Function not implemented.");
}

