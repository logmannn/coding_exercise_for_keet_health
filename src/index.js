import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux"; //redux bindings for react
import thunk from "redux-thunk"; //middleware that allows us to use promises in actions (async actions)
import { createStore, applyMiddleware, compose } from "redux"; //allows us to create the store and middleware

import reducers from "./reducers/index";

import "./index.css";
import App from "./components/App";
import Results from "./components/Results";
import SimpleBanner from "./components/common/SimpleBanner";

const middleware = [thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(...middleware))
);

ReactDOM.render(
  <>
    <SimpleBanner />
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/search/:search" component={Results} />
          <Route component={App} />
        </Switch>
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);

registerServiceWorker();
