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

export const openMenu = (menu: string) => {
  return {
    type: "OPEN_MENU",
    menu,
  };
};

export const closeMenu = () => {
  return {
    type: "CLOSE_MENU",
  };
};

export const restart = () => {
  return {
    type: "RESTART",
  };
};

export const closeAllMenus = () => {
  return {
    type: "CLOSE_ALL_MENUS",
  };
};
