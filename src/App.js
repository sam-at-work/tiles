// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import { startLevel } from "./actionCreators";
import Board from "./components/Board";
import Message from "./components/Message";
import { levelGenerator } from "./functions/level-generator";

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

function App({ gameStarted, pathComplete, level, dispatch }) {
  console.info(`Level ${level}. Go!`);

  const loadLevel = () => dispatch(startLevel(levelGenerator(level)));

  return (
    <div>
      {gameStarted ? <Board /> : <WelcomeScreen handleClick={loadLevel} />}
      {pathComplete ? <LevelComplete handleClick={loadLevel} /> : null}
    </div>
  );
}

const mapStateToProps = state => ({
  gameStarted: state.game.gameStarted,
  pathComplete: state.board ? state.board.pathComplete : null,
  level: state.game.level,
});

export default connect(mapStateToProps)(App);
