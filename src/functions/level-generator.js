import { boardGererator } from "./board-generator";
import type { BoardState, BoardMeta } from "../types";

export function levelGenerator(level): boardMeta {
  const { height, width } = boardSizeGenerator(level);

  const boardMeta: BoardMeta = boardGererator(height, width, 100);

  console.log(boardMeta.solutions);
  console.log(boardMeta.shortestPathLength);

  return boardMeta;
}

export function boardSizeGenerator(level) {
  const LEVELS_PER_STAGE = 3;
  const startingWidth = 5;
  const width = startingWidth + Math.floor((level - 1) / LEVELS_PER_STAGE);
  const height = width + (level - 1) % LEVELS_PER_STAGE;
  return { height, width };
}
