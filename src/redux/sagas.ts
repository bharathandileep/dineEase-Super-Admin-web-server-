import { all,fork } from "redux-saga/effects";
import layoutSaga from "./layout/saga";
import {watchFetchData} from "./customer/customerSaga";
import { watchCompanyFetch } from "./company/companySaga";

export default function* rootSaga() {
  yield all([
    fork( watchFetchData),
    fork(watchCompanyFetch),
    layoutSaga(),
  ]);
}
