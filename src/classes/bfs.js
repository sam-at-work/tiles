// @flow

import type { TileId, SetOfPaths, Vertex, GameState, Rotation, TileState } from "../types";

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
  while (openSet.length > 0 && count++ <= 100000) {
    console.log(count);
    const path: Path = openSet.shift();
    const subTreeRoot: Vertex = path.nextVertex;
    const tileId: TileId = game.vertexToTileId[subTreeRoot];
    const tile: TileState = game.idToTileState[tileId];
    const allPathsThroughTile: SetOfPaths = getAllPaths(tile);

    [...allPathsThroughTile]
      .filter(p => p.has(subTreeRoot))
      .map(p => getOppositeEnfOfPath(p, subTreeRoot))
      .map(v => {
        if (v === game.endVertex) {
          completePaths.push(path);
        }
        return v;
      })
      .map(v => game.adjacencyList[v][0])
      .filter(v => v) // filter any undefined (they head off board)
      .forEach(v => {
        if (!new Set(path.currentPath).has(game.vertexToTileId[v])) {
          const newPath: Path = { currentPath: [...path.currentPath, tileId], nextVertex: v };
          openSet.push(newPath);
        }
      });
  }
  return completePaths;
}
