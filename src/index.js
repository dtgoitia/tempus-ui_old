import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import store from "./store";
import UrlNotFound from "./scenes/404";
import ExerciseExplorerScene from "./scenes/exerciseExplorer";
import PlanExplorerScene from "./scenes/planExplorer";
import PlanEditorScene from "./scenes/planEditor";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={PlanExplorerScene} />
        <Route exact path="/exercises" component={ExerciseExplorerScene} />
        <Route exact path="/plans" component={PlanExplorerScene} />
        <Route exact path="/plans/:planId" component={PlanEditorScene} />
        <Route path="*" component={UrlNotFound} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
