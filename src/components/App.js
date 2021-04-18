import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Wrapper from "./Wrapper/Wrapper";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Wrapper} />
      <Route path="*" component={Wrapper} />
    </Switch>
  </Router>
);

export default App;
