import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Wrapper from "./Wrapper/Wrapper";

// styles
// import "./index.scss";
import "../styles/index.scss";

const App = () => (
  <HashRouter>
    <Switch>
      <Route component={Wrapper} />
    </Switch>
  </HashRouter>
);

export default App;
