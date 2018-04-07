// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import { startGame } from "./actionCreators";
import Board from "./components/Board";
import Message from "./components/Message";

const WelcomeScreen = ({ handleClick }) => (
  <Message>
    Ready to play?
    <button onClick={handleClick}>Yes!</button>
  </Message>
);

const LevelComplete = ({ handleClick }) => (
  <Message>
    Next Level?
    <button onClick={handleClick}>Yes!</button>
  </Message>
);

function App({ gameStarted, pathComplete, onStartClick, onLevelCompleteClick }) {
  return (
    <div>
      {gameStarted ? <Board /> : <WelcomeScreen handleClick={onStartClick} />}
      {pathComplete ? <LevelComplete handleClick={onLevelCompleteClick} /> : null}
    </div>
  );
}

const mapStateToProps = state => ({
  gameStarted: state.game.gameStarted,
  pathComplete: state.board ? state.board.pathComplete : null,
});

const mapDispatchToProps = dispatch => {
  return {
    onStartClick: () => dispatch(startGame()),
    onLevelCompleteClick: () => dispatch(startGame()), // update action later to make harder level;
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
