// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { startLevel } from "./actionCreators";
import Board from "./components/Board";
import Message from "./components/Message";
import HUD from "./components/HUD";
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

const AppStyles = styled.div`
  .grid {
    margin-left: auto;
    margin-right: auto;
  }

  .hud {
    position: fixed;
    top: 0;

    // horizontally center
    left: 50%;
    transform: translateX(-50%);
  }
`;

function App({ gameStarted, pathComplete, level, shortestPathLength, dispatch }) {
  console.info(`Level ${level}. Go!`);
  const loadLevel = () => dispatch(startLevel(levelGenerator(level)));
  if (!gameStarted) {
    return <WelcomeScreen handleClick={loadLevel} />;
  }
  return (
    <AppStyles>
      <Board className="grid" />
      <HUD className="hud" level={level} shortestPathLength={shortestPathLength} />
      {pathComplete ? <LevelComplete handleClick={loadLevel} /> : null}
    </AppStyles>
  );
}

const mapStateToProps = (
  state
): { gameStarted: boolean, pathComplete: boolean | null, level: number } => ({
  gameStarted: state.game.gameStarted,
  pathComplete: state.board ? state.board.pathComplete : null,
  shortestPathLength: state.board ? state.board.shortestPathLength : null,
  level: state.game.level,
});

export default connect(mapStateToProps)(App);
