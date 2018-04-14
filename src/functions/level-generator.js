import { boardGererator } from "./board-generator";
import type { BoardMeta } from "../types";
import { store } from "../store";

export function levelGenerator(): boardMeta {
  const { height, width } = boardSizeGenerator();

  const boardMeta: BoardMeta = boardGererator(height, width, 100);

  console.log(boardMeta.solutions);
  console.log(boardMeta.shortestPathLength);

  return boardMeta;
}

export function boardSizeGenerator() {
  const { level, gameType } = store.getState().game;
  const LEVELS_PER_STAGE = 3;
  const startingWidth = 5;
  const width = startingWidth + Math.floor((level - 1) / LEVELS_PER_STAGE);
  const height = width + (level - 1) % LEVELS_PER_STAGE;

  console.info(`Level ${level}. Go!`);

  if (gameType == "portrait") return { height, width };
  return { height: width, width: height };
}
