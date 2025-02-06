import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// layout constants
import { LayoutTypes } from "../constants/layout";

// strore
import { RootState } from "../redux/store";

// All layouts containers
import DefaultLayout from "../layouts/Default";
import VerticalLayout from "../layouts/Vertical";
import DetachedLayout from "../layouts/Detached";
import HorizontalLayout from "../layouts/Horizontal/";
import TwoColumnLayout from "../layouts/TwoColumn/";

import {
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
} from "./index";
<<<<<<< HEAD
import { ToastContainer } from "react-toastify";

=======
import { isUserAuthenticated } from "../helpers/api/apiCore";
>>>>>>> 333cf02b85072ed6f3a4acb4b2a08840f6bce36e


interface IRoutesProps {}

const AllRoutes = (props: IRoutesProps) => {
  const { layout } = useSelector((state: RootState) => ({
    layout: state.Layout,
  }));

  const getLayout = () => {
    let layoutCls = TwoColumnLayout;

    switch (layout.layoutType) {
      case LayoutTypes.LAYOUT_HORIZONTAL:
        layoutCls = HorizontalLayout;
        break;
      case LayoutTypes.LAYOUT_DETACHED:
        layoutCls = DetachedLayout;
        break;
      case LayoutTypes.LAYOUT_VERTICAL:
        layoutCls = VerticalLayout;
        break;
      default:
        layoutCls = TwoColumnLayout;
        break;
    }
    return layoutCls;
  };

  let Layout = getLayout();


  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicProtectedFlattenRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <DefaultLayout {...props} layout={layout}>
                  {route.element}
                </DefaultLayout>
              }
              key={idx}
            />
          ))}
        </Route>

        <Route>
          {authProtectedFlattenRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                isUserAuthenticated() === false ? (
                  <Navigate
                    to={{
                      pathname: "/auth/login",
                    }}
                  />
                ) : (
                  <Layout {...props}>{route.element}</Layout>
                )
              }
              key={idx}
            />
          ))}
        </Route>
      </Routes>
     
    </React.Fragment>
  );
};

export default AllRoutes;
