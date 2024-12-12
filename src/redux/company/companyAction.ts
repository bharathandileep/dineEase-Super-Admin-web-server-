import { Company } from "./companyReducer";

// src/redux/company/companyAction.ts
export const FETCH_COMPANY_REQUEST = 'FETCH_COMPANY_REQUEST';
export const FETCH_COMPANY_SUCCESS = 'FETCH_COMPANY_SUCCESS';
export const FETCH_COMPANY_FAILURE = 'FETCH_COMPANY_FAILURE';

export const fetchCompanyRequest = () => ({
  type: FETCH_COMPANY_REQUEST,
});

export const fetchCompanySuccess = (companies: Company[]) => ({
  type: FETCH_COMPANY_SUCCESS,
  payload: companies,
});

export const fetchCompanyFailure = (error: string) => ({
  type: FETCH_COMPANY_FAILURE,
  payload: error,
});
