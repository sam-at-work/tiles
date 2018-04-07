// @flow
import { getAllPaths } from "src/functions/tile";
import { getOppositeEnfOfPath } from "./tile";

import type { Path, Paths, TileId, SetOfPaths, Vertex, GameState, TileState } from "../types";

type OpenPath = {
  path: Path,
  nextVertex: Vertex,
};

export default function bfs(game: GameState): Paths {
  const solutions: Paths = [];
  const openSet: Array<OpenPath> = [{ path: [], nextVertex: game.startingVertex }]; // a FIFO queue

  let count = 0;
  while (openSet.length > 0 && count++ <= 10000) {
    const openPath: OpenPath = openSet.shift();
    const subTreeRoot: Vertex = openPath.nextVertex;
    const tileId: TileId = game.vertexToTileId[subTreeRoot];
    const tile: TileState = game.idToTileState[tileId];
    const allPathsThroughTile: SetOfPaths = getAllPaths(tile);

    const verticesReachableOnTile = [...allPathsThroughTile]
      .filter(p => p.has(subTreeRoot))
      .map(p => getOppositeEnfOfPath(p, subTreeRoot));

    if (verticesReachableOnTile.includes(game.endVertex)) {
      solutions.push([...openPath.path, tileId]);
      continue;
    }

    // for every vertex reachable on other tiles that haven't been visited yet, add to a new path.
    verticesReachableOnTile
      .map(v => game.adjacencyList[v][0])
      .filter(v => v) // filter any undefined (they head off board)
      .forEach(v => {
        if (!openPath.path.includes(game.vertexToTileId[v])) {
          const newPath: OpenPath = {
            path: [...openPath.path, tileId],
            nextVertex: v,
          };
          openSet.push(newPath);
        }
      });
  }
  return solutions;
}
