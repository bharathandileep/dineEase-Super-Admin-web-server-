import React from "react";

import AllRoutes from "./routes/Routes";



// For Default import Default.scss
import './assets/scss/Default.scss';

// Other
import './assets/scss/Landing.scss';
import "./assets/scss/Icons.scss";
import { ToastContainer } from "react-toastify";



const App = () => {
  return (
    <>
      <React.Fragment>
        <AllRoutes />
        <ToastContainer/>
      </React.Fragment>
    </>
  );
};

export default App;
