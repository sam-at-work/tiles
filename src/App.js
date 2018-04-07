// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import { startGame } from "./actionCreators";

import Board from "./components/Board";

class App extends Component<{}> {
  render() {
    if (this.props.game.gameStarted) {
      return <Board />;
    } else {
      return (
        <div>
          Ready to play?
          <button onClick={() => this.props.dispatch(startGame())}>Yes!</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  game: state.game,
  board: state.board,
});

export default connect(mapStateToProps)(App);
