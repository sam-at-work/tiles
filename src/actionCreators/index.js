// @flow

import type { BoardState, TileId } from "../types";

export const rotateTile = (id: TileId, rotation: number) => ({
  type: "ROTATE_TILE",
  id,
  rotation,
});

export const setInitialState = (board: BoardState) => ({
  type: "SET_INITIAL_STATE",
  board,
});

export const startGame = () => ({
  type: "START_GAME",
});
