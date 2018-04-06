// @flow

import type { GameState, TileId } from "../types";

export const rotateTile = (id: TileId, rotation: number) => ({
  type: "ROTATE_TILE",
  id,
  rotation
});

export const setInitialState = (problem: GameState) => ({
  type: "SET_INITIAL_STATE",
  problem
});
