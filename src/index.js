import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "add-to-homescreen/addtohomescreen.css";
import "add-to-homescreen/addtohomescreen";
import { store } from "./store";

window.addToHomescreen({ displayPace: 0, lifespan: 0 });

// - https://github.com/gaearon/redux-devtools/issues/310
// if (process.env.NODE_ENV !== "production") {
//   import("set.prototype.tojson");
// }

// - Every time the state changes, log it
// - Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()));

// - https://coderwall.com/p/w_likw/enable-disable-scrolling-in-iphone-ipad-s-safari
// document.ontouchmove = function(e) {
//   e.preventDefault();
// };

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
