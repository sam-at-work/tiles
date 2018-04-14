// @flow

import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import { openMenu, startLevel, closeAllMenus } from "./actionCreators";
import Board from "./components/Board";
import HUD from "./components/HUD";
import { levelGenerator } from "./functions/level-generator";
import MenuController from "./components/Menus/MenuController";
import Button from "./components/Menu/Button";
import LevelComplete from "./components/Menus/LevelComplete";

const AppStyles = styled.div`
  ${props => (props.disabled ? `> * {pointer-events: none;}` : null)};

  height: 100%; /* to get board background to fill whole screen */
  .board {
    height: 100%; /* to get board background to fill whole screen */
    margin-left: auto;
    margin-right: auto;
  }

  .hud {
    position: fixed;
    top: 0;
    left: 0;

    // horizontally center
    //left: 50%;
    //transform: translateX(-50%);
  }

  .menu-button {
    position: fixed;
    top: 0;
    right: 0;
  }
`;

function App({
  openMenus,
  gameType,
  gameStarted,
  pathComplete,
  level,
  shortestPathLength,
  dispatch,
}) {
  const loadLevel = () => dispatch(startLevel(levelGenerator()));

  return (
    <React.Fragment>
      {gameStarted ? (
        <AppStyles
          disabled={openMenus.length > 0}
          onClick={() => {
            if (openMenus.length) dispatch(closeAllMenus());
          }}
        >
          <Board className="board" />
          <HUD
            className="hud"
            level={level}
            shortestPathLength={shortestPathLength}
            gameType={gameType}
          />
          <Button className="menu-button" onClick={() => dispatch(openMenu("home"))}>
            Menu
          </Button>

          <CSSTransition in={pathComplete} timeout={1500} classNames="message" unmountOnExit>
            <LevelComplete loadLevel={loadLevel} />
          </CSSTransition>
        </AppStyles>
      ) : null}
      <MenuController onClick={e => e.stopPropagation()} />
    </React.Fragment>
  );
}

const mapStateToProps = (
  state
): { gameStarted: boolean, pathComplete: boolean | null, level: number } => ({
  gameStarted: state.game.gameStarted,
  gameType: state.game.gameType,
  pathComplete: state.board ? state.board.pathComplete : null,
  shortestPathLength: state.board ? state.board.shortestPathLength : null,
  level: state.game.level,
  openMenus: state.game.openMenus,
});

export default connect(mapStateToProps)(App);
