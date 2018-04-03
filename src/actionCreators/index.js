// @flow

import type { GameState } from "../types";

export const rotateTile = (id: number, rotation: number) => ({
  type: "ROTATE_TILE",
  id,
  rotation
});

export const setInitialState = (problem: GameState) => ({
  type: "SET_INITIAL_STATE",
  problem
});
