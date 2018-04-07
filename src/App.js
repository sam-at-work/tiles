// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import Board from "src/containers/Board";
import { setInitialState } from "src/actionCreators";
import { newGameState } from "./functions/game-state";
import type { GameState } from "./types";
import bfs from "./functions/bfs";

const boardHeight = 13;
const boardWidth = 5;

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();
    let solutions;
    let game: GameState;
    do {
      game = newGameState(boardHeight, boardWidth);
      solutions = bfs(game);
    } while (
      solutions.length == 0 ||
      solutions.every(s => s.currentPath.length < Math.min(boardHeight, boardWidth) * 2)
    );
    console.log(solutions.length);
    dispatch(setInitialState(game));
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
