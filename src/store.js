import { combineReducers, createStore } from "redux";
import boardReducer from "./reducers/board-reducer";
import gameReducer from "./reducers/game-reducer";

let persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

if (persistedState.game && persistedState.game.version !== process.env.REACT_APP_VERSION) {
  persistedState = {};
}

export const store = createStore(
  combineReducers({ board: boardReducer, game: gameReducer }),
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
