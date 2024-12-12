// src/redux/customer/customerSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure, FETCH_DATA_REQUEST } from './customerAction';
import { Customer } from './customerReducer';
import { commonapi } from '../../server/commonApi';
import { baseURL } from '../../server/server_URL';

export const fetchDataApi = async (): Promise<Customer[]> => {
  const response = await fetch('`${baseURL}/customer`,', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: Customer[] = await response.json();
  return data;
};

function* fetchData() {
  try {
    const data: Customer[] = yield call(fetchDataApi);
    yield put(fetchDataSuccess(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchDataFailure(error.message));
    } else {
      yield put(fetchDataFailure('An unknown error occurred'));
    }
  }
}

export function* watchFetchData() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchData);
}
