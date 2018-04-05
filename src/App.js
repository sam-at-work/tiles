// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "src/containers/Board";
import { setInitialState } from "src/actionCreators";
import "./App.css";
import initialProblemState from "./classes/initialProblemState";
import type { GameState } from "./types";
import bfs from "./classes/bfs";
const boardHeight = 4;
const boardWidth = 8;

// const tiles =

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();
    let solutions = null;
    let problemState: GameState = null;
    do {
      problemState= initialProblemState(boardHeight, boardWidth);
      // console.log(problemState.vertexToTileId);
      // console.log(problemState.idToTileState);
      solutions = bfs(problemState);
    } while (solutions.length == 0);

    console.log(solutions);
    console.log(solutions.length);

    dispatch(setInitialState(problemState));
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
