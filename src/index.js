import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import "./index.css";
import Board from "./components/Board";
import registerServiceWorker from "./registerServiceWorker";
import boardReducer from "./reducers/board-reducer";
import gameReducer from "./reducers/game-reducer";

import "add-to-homescreen/addtohomescreen.css";
import "add-to-homescreen/addtohomescreen";
window.addToHomescreen({ displayPace: 0, lifespan: 0 });

// - https://github.com/gaearon/redux-devtools/issues/310
if (process.env.NODE_ENV !== "production") {
  import("set.prototype.tojson");
}

// - Every time the state changes, log it
// - Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()));

// - https://coderwall.com/p/w_likw/enable-disable-scrolling-in-iphone-ipad-s-safari
// document.ontouchmove = function(e) {
//   e.preventDefault();
// };

const store = createStore(
  combineReducers({ board: boardReducer, game: gameReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
