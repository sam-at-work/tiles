// @flow

import type { TileId, SetOfPaths, Vertex, GameState, TileState } from "../types";

import { getAllPaths } from "src/classes/tile";
import { getOppositeEnfOfPath } from "./tile";

type Path = {
  currentPath: Array<TileId>,
  nextVertex: Vertex
};

export default function bfs(game: GameState) {
  const completePaths: Array<Path> = [];
  const openSet: Array<Path> = [{ currentPath: [], nextVertex: game.startingVertex }]; // a FIFO queue

  let count = 0;
  while (openSet.length > 0 && count++ <= 10000) {
    console.log(count);
    const path: Path = openSet.shift();
    const subTreeRoot: Vertex = path.nextVertex;
    const tileId: TileId = game.vertexToTileId[subTreeRoot];
    const tile: TileState = game.idToTileState[tileId];
    const allPathsThroughTile: SetOfPaths = getAllPaths(tile);

    const verticesReachableOnTile = [...allPathsThroughTile]
      .filter(p => p.has(subTreeRoot))
      .map(p => getOppositeEnfOfPath(p, subTreeRoot));

    if (verticesReachableOnTile.includes(game.endVertex)) {
      completePaths.push(path);
      continue;
    }

    verticesReachableOnTile
      .map(v => game.adjacencyList[v][0])
      .filter(v => v) // filter any undefined (they head off board)
      .forEach(v => {
        if (!path.currentPath.includes(game.vertexToTileId[v])) {
          const newPath: Path = { currentPath: [...path.currentPath, tileId], nextVertex: v };
          openSet.push(newPath);
        }
      });
  }
  return completePaths;
}
