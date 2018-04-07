// @flow

import type { BoardMeta, BoardState, TileId } from "../types";
import { boardGererator } from "../functions/board";

export const rotateTile = (id: TileId, rotation: number) => ({
  type: "ROTATE_TILE",
  id,
  rotation,
});

export const setInitialState = (board: BoardState) => ({
  type: "SET_INITIAL_STATE",
  board,
});

export const startGame = () => {
  const boardHeight = 3; //9;
  const boardWidth = 3; //9;

  const { board, solutions, shortestPathLength }: BoardMeta = boardGererator(
    boardHeight,
    boardWidth,
    1 // 200
  );

  console.log(solutions);
  console.log(shortestPathLength);

  return {
    type: "START_GAME",
    board,
  };
};
