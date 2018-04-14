// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { startLevel } from "./actionCreators";
import Board from "./components/Board";
import Message from "./components/Message";
import HUD from "./components/HUD";
import { levelGenerator } from "./functions/level-generator";
import MenuController from "./components/Menus/MenuController";

const LevelComplete = ({ handleClick }) => (
  <Message>
    Next Level?
    <button onClick={handleClick}>Yes!</button>
  </Message>
);

const AppStyles = styled.div`
  height: 100%; /* to get board background to fill whole screen */
  .board {
    height: 100%; /* to get board background to fill whole screen */
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

  return (
    <AppStyles>
      <Board className="board" />
      <HUD className="hud" level={level} shortestPathLength={shortestPathLength} />
      {pathComplete ? <LevelComplete handleClick={loadLevel} /> : null}
      <MenuController />;
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
