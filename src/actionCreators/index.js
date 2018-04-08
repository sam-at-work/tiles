// @flow

import type { BoardState, TileId } from "../types";

export const rotateTile = (id: TileId, rotation: number) => ({
  type: "ROTATE_TILE",
  id,
  rotation,
});

export const startLevel = (board: BoardState) => {
  return {
    type: "START_LEVEL",
    board,
  };
};
