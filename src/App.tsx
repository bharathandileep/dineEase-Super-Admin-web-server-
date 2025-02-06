import React from "react";

import AllRoutes from "./routes/Routes";

// For Default import Default.scss
import "./assets/scss/Default.scss";

// Other
import "./assets/scss/Landing.scss";
import "./assets/scss/Icons.scss";

const App = () => {
  return (
    <>
      <React.Fragment>
        <AllRoutes />
      </React.Fragment>
    </>
  );
};

export default App;
