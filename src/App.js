// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import Board from "src/containers/Board";
import { setInitialState } from "src/actionCreators";
import { boardGererator } from "./functions/board";
import type { BoardMeta } from "./types";

const boardHeight = 9;
const boardWidth = 9;

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();

    const { board, solutions, shortestPathLength }: BoardMeta = boardGererator(
      boardHeight,
      boardWidth,
      200
    );

    console.log(solutions);
    console.log(shortestPathLength);
    dispatch(setInitialState(board));
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
