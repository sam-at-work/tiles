// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "src/containers/Board";
import { setInitialState } from "src/actionCreators";
import "./App.css";
import initialProblemState from "./classes/initialProblemState";
import type { GameState } from "./types";
import bfs from "./classes/bfs";
const boardHeight = 3;
const boardWidth = 3;

// const tiles =

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();

    const problemState: GameState = initialProblemState(boardHeight, boardWidth);
    console.log(problemState.vertexToTileId);
    console.log(problemState.idToTileState);
    bfs(problemState);
    dispatch(setInitialState(problemState));
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
