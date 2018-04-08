import { boardGererator } from "./board-generator";
import type { BoardState, BoardMeta } from "../types";

export function levelGenerator(level): BoardState {
  const { height, width } = boardSizeGenerator(level);

  const { board, solutions, shortestPathLength }: BoardMeta = boardGererator(height, width, 100);

  console.log(solutions);
  console.log(shortestPathLength);

  return board;
}

export function boardSizeGenerator(level) {
  const LEVELS_PER_STAGE = 3;
  const startingWidth = 5;
  const width = startingWidth + Math.floor((level - 1) / LEVELS_PER_STAGE);
  const height = width + (level - 1) % LEVELS_PER_STAGE;
  return { height, width };
}
