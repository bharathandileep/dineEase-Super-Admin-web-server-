// src/redux/customer/customerSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_COMPANY_REQUEST, fetchCompanySuccess, fetchCompanyFailure } from './companyAction';
import { Company } from './companyReducer';

const baseURL = ''; // replace with your actual base URL

export const fetchCompanyApi = async (): Promise<Company[]> => {
  const response = await fetch(`${baseURL}/company`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: Company[] = await response.json();
  return data;
};


function* fetchDatacompany() {
  try {
    const data: Company[] = yield call(fetchCompanyApi);
    yield put(fetchCompanySuccess(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchCompanyFailure(error.message));
    } else {
      yield put(fetchCompanyFailure('An unknown error occurred'));
    }
  }
}

export function* watchCompanyFetch() {
  yield takeEvery(FETCH_COMPANY_REQUEST, fetchDatacompany);
}
