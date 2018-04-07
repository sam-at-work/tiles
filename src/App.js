// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import Board from "src/containers/Board";
import { setInitialState } from "src/actionCreators";
import { newBoardState } from "./functions/board";
import type { Paths, BoardState } from "./types";
import bfs from "./functions/bfs";

const boardHeight = 9;
const boardWidth = 9;

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();

    const goodGames: Array<{ game: BoardState, solutions: Paths, shortestPathLength: number }> = [];

    do {
      const game: BoardState = newBoardState(boardHeight, boardWidth);
      const solutions: Paths = bfs(game);
      if (
        solutions.length &&
        solutions.every(s => s.length > Math.min(boardHeight, boardWidth) * 2)
      ) {
        goodGames.push({
          game,
          solutions,
          shortestPathLength: solutions.reduce(
            (acc, path) => Math.min(acc, path.length),
            Number.MAX_VALUE
          ),
        });
      }
    } while (goodGames.length < 200);

    const { shortestPathLength, game, solutions } = goodGames.reduce(
      (acc, cur) => (acc.shortestPathLength > cur.shortestPathLength ? acc : cur)
    );

    console.log(solutions);
    console.log(shortestPathLength);
    dispatch(setInitialState(game));
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
