// @flow

import type { BoardMeta, TileId } from "../types";

export const rotateTile = (id: TileId, rotation: number) => ({
  type: "ROTATE_TILE",
  id,
  rotation,
});

export const startLevel = (board: BoardMeta) => {
  return {
    type: "START_LEVEL",
    board,
  };
};

export const setGameType = (gameType: "portrait" | "landscpae") => {
  return {
    type: "SET_GAME_TYPE",
    gameType,
  };
};
