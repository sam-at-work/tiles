import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import problemReducer from "./reducers";

// https://github.com/gaearon/redux-devtools/issues/310
if (process.env.NODE_ENV !== "production") {
  import("set.prototype.tojson");
}

// https://coderwall.com/p/w_likw/enable-disable-scrolling-in-iphone-ipad-s-safari
// disables all momentum scrolling (ios always) desktop when bug overflow
// document.ontouchmove = function(e) {
//   e.preventDefault();
// };

// const rootReducer = combineReducers({ board });
const store = createStore(
  problemReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
