// @flow

import type { CustomBoard } from "src/types";

export const rotateTile = (id: number, rotation: number) => ({
  type: "ROTATE_TILE",
  id,
  rotation
});

export const setBoard = (board: CustomBoard) => ({
  type: "SET_BOARD",
  board
});
