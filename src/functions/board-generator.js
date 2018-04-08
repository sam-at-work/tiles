import type { BoardMeta, BoardState, Paths } from "../types";
import bfs from "./bfs";
import { newBoardState } from "./board";

export function boardGererator(
  boardHeight: number,
  boardWidth: number,
  numberToGenerate: number
): BoardMeta {
  const validBoards: Array<BoardMeta> = [];
  let counter = 0;
  let excluded = 0;
  let solutionlessBoards = 0;

  do {
    counter++;
    const board: BoardState = newBoardState(boardHeight, boardWidth);
    const solutions: Paths = bfs(board);
    if (solutions.length == 0) {
      solutionlessBoards++;
    } else if (!solutions.every(s => s.length > Math.min(boardHeight, boardWidth) * 2)) {
      excluded++;
    } else {
      validBoards.push({
        board,
        solutions,
        shortestPathLength: solutions.reduce(
          (acc, path) => Math.min(acc, path.length),
          Number.MAX_VALUE
        ),
      });
    }
  } while (validBoards.length < numberToGenerate);

  console.info(`Generated ${validBoards.length} valid board states in ${counter} iterations.`);
  console.info(`Generated ${solutionlessBoards} solution-less board states.`);
  console.info(`${excluded} board states were excluded for having too short solutions.`);

  return validBoards.reduce(
    (acc, cur) => (acc.shortestPathLength > cur.shortestPathLength ? acc : cur)
  );
}
