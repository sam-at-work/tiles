// @flow

import type { BoardState } from "src/types";

export const rotateTile = (id: number, rotation: number) => ({
  type: "ROTATE_TILE",
  id,
  rotation
});

export const setBoard = (board: BoardState) => ({
  type: "SET_BOARD",
  board
});
