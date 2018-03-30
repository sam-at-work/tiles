import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import settings from "./reducers/boardSettings";
import tiles from "./reducers/tiles";
import board from "./reducers/board";

const rootReducer = combineReducers({ settings, tiles, board });
const store = createStore(rootReducer);

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
