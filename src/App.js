// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "src/containers/Board";
import { setInitialState } from "src/actionCreators";
import "./App.css";
import ProblemFactory from "./classes/problem";

const boardHeight = 8;
const boardWidth = 6;

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();

    const problemState = new ProblemFactory(boardHeight, boardWidth).getState();
    console.log(problemState.vertexToTileId);
    dispatch(setInitialState(problemState));
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
