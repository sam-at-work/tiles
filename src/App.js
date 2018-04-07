// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import { startGame } from "./actionCreators";
import Board from "./components/Board";

function App({ game, dispatch }) {
  if (game.gameStarted) {
    return <Board />;
  }
  return (
    <div>
      Ready to play?
      <button onClick={() => dispatch(startGame())}>Yes!</button>
    </div>
  );
}

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps)(App);
