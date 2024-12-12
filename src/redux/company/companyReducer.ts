// src/redux/company/companyReducer.ts
import { FETCH_COMPANY_REQUEST, FETCH_COMPANY_SUCCESS, FETCH_COMPANY_FAILURE } from './companyAction';

export interface Company {
  company_id: number;
  company_name: string;
  company_location: string;
  company_contact: number;
}

export interface CompanyState {
  companies: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null,
};

const companyReducer = (state = initialState, action: any): CompanyState => {
  switch (action.type) {
    case FETCH_COMPANY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COMPANY_SUCCESS:
      return { ...state, loading: false, companies: action.payload };
    case FETCH_COMPANY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
