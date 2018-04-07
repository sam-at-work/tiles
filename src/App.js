// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import Board from "src/containers/Board";
import { setInitialState } from "src/actionCreators";
import "./App.css";
import initialProblemState from "./functions/game-state";
import type { GameState } from "./types";
import bfs from "./functions/bfs";

const boardHeight = 13;
const boardWidth = 5;

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();
    let solutions;
    let problemState: GameState;
    do {
      problemState = initialProblemState(boardHeight, boardWidth);
      // console.log(problemState.vertexToTileId);
      // console.log(problemState.idToTileState);
      solutions = bfs(problemState);
    } while (
      solutions.length == 0 ||
      solutions.every(s => s.currentPath.length < Math.min(boardHeight, boardWidth) * 2)
    );

    console.log(solutions.length);
    console.log(solutions);
    // console.log(solutions[0].currentPath.length);

    dispatch(setInitialState(problemState));
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
