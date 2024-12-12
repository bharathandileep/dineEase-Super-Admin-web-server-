import { combineReducers } from "redux";
import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
// import customerReducer from "./customer/customerReducer";
import companyReducer from "./company/companyReducer";
import dataReducer from "./customer/customerReducer";

export const rootReducer = combineReducers({
  Auth,
  Layout,
  // customer: customerReducer,
  data: dataReducer,
  company: companyReducer,
});
export type RootStates = ReturnType<typeof rootReducer>;

