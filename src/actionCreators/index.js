// @flow

import type { ProblemState } from "../types";

export const rotateTile = (id: number, rotation: number) => ({
  type: "ROTATE_TILE",
  id,
  rotation
});

export const setInitialState = (problem: ProblemState) => ({
  type: "SET_INITIAL_STATE",
  problem
});
