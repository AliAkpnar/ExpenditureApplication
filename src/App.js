import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Category from "./Category";
import Home from "./Home";
import Expenditures from "./Expenditures";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/categories" exact={true} component={Category} />
          <Route path="/expenditures" exact={true} component={Expenditures} />
        </Switch>
      </Router>
    );
  }
}
export default App;
