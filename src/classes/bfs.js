// @flow

import type { TileId, SetOfPaths, Vertex, GameState, Rotation, TileState } from "../types";

import { getAllPaths } from "src/classes/tile";
import { getOppositeEnfOfPath } from "./tile";

// type Path = {
//   squaresVisited: Set<number>,
//   path: Array<{ square: number, rotation: Rotation }>
// };
// type Path = Array<number>; // number is TileId
type Path = {
  currentPath: Array<TileId>,
  nextVertex: Vertex
};

export default function bfs(game: GameState) {
  // console.log(game);
  // a FIFO queue
  const completePaths: Array<Path> = [];
  const openSet: Array<Path> = [];

  // a dictionary to maintain meta information (used for path formation)
  // const meta: { [number]: { [number]: number } } = {}; // key -> (parent state, action to reach child)

  // initialize
  const root: Vertex = game.startingVertex;
  const startingTileId = game.vertexToTileId[game.startingVertex];
  const startingTile: TileState = game.idToTileState[startingTileId];

  const allPathsThroughTile: SetOfPaths = getAllPaths(startingTile);

  const verticesReachable: Array<Vertex> = [...allPathsThroughTile]
    .filter(path => path.has(root))
    .map(path => getOppositeEnfOfPath(path, root));

  // console.log(verticesReachable);
  const verticesForNextTiles = verticesReachable
    .map(vertex => game.adjacencyList[vertex][0])
    .filter(v => v);

  // console.log("wine");
  // console.log(verticesForNextTiles);
  // console.log("prok");

  verticesForNextTiles.forEach(v => {
    const path: Path = { currentPath: [startingTileId], nextVertex: v };
    openSet.push(path);
  });

  let count = 0;
  // For each node on the current level expand and process, if no children (leaf, then unwind)
  while (openSet.length > 0 && count++ <= 100000) {
    const path: Path = openSet.shift();
    const subTreeRoot: Vertex = path.nextVertex;

    // console.log(count, path.nextVertex, path.currentPath);

    // We found the node we wanted so stop and emit a path.
    if (game.endVertex === subTreeRoot) {
      console.log("i dont think we should ever get here :(");
      completePaths.push(path);
      break;
    }

    const tileId: TileId = game.vertexToTileId[subTreeRoot];
    const tile: TileState = game.idToTileState[tileId];
    const allPathsThroughTile: SetOfPaths = getAllPaths(tile);

    const verticesReachable: Array<Vertex> = [...allPathsThroughTile]
      .filter(p => p.has(subTreeRoot))
      .map(p => getOppositeEnfOfPath(p, subTreeRoot));

    // console.log(verticesReachable);
    // need to check here before we filter out vertexes who lead off board;
    if (new Set(verticesReachable).has(game.endVertex)) {
      completePaths.push(path);
      break;
    }

    const verticesForNextTiles = verticesReachable
      .map(v => game.adjacencyList[v][0])
      .filter(v => v); // filter any undefined (they head off board)

    verticesForNextTiles.forEach(v => {
      if (!new Set(path.currentPath).has(game.vertexToTileId[v])) {
        const newPath: Path = { currentPath: [...path.currentPath, tileId], nextVertex: v };
        openSet.push(newPath);
      }
    });
  }
  return completePaths;
}
