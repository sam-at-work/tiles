// @flow

import type { Tiles, ProblemState, TileState } from "src/types";
import { rotateTile } from "../classes/tile";

// const defaultState: BoardState = {
//   tiles: {},
//   rows: [[]],
//   adjacencyList: [[]],
//   vertexToTile: {},
//   startingVertex: -1,
//   endVertex: -1,
//   dimensions: { width: 5, height: 4 },
//   rotationTime: 750
// };

export default function(state: ProblemState, action: { type: string, [string]: any }) {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return updateBoard(action.problem, action.problem.idToTileState);

    case "ROTATE_TILE":
      const newTiles: Tiles = {
        ...state.idToTileState,
        [action.id]: rotateTile(state.idToTileState[action.id], action.rotation)
      };

      return updateBoard(state, newTiles);
    default:
      return state;
  }
}

function updateBoard(state: ProblemState, idToTileState: Tiles): ProblemState {
  // need space
  const { adjacencyList, startingVertex, vertexToTileId, rotationTime } = state;

  // disconnect all tiles
  const prevConnectedTiles: Set<number> = new Set();
  // having to use parseInt to make flow happy - related to https://github.com/facebook/flow/issues/2221
  Object.keys(idToTileState).forEach(tileIdStr => {
    const tileId: number = parseInt(tileIdStr);
    const tile: TileState = idToTileState[tileId];
    if (tile.connected) prevConnectedTiles.add(tileId);
    tile.connected = false;
    tile.animationDelay = null;
  });

  let nextExternalVertex: number | void = startingVertex;
  let newlyConnectedTileCount: number = 0;
  let nextVertex: number | void = undefined;

  // since 0 is valid vertex but is falsey
  while (typeof nextExternalVertex === "number") {
    const tileId: number = vertexToTileId[nextExternalVertex];
    // console.log(tileId);
    const tile: TileState = idToTileState[tileId];
    const vertexConnectsToPipe = tile.externalPath.has(nextExternalVertex);
    if (!vertexConnectsToPipe) break;

    tile.connected = true;
    if (prevConnectedTiles.has(tileId)) {
      tile.animationDelay = logarithmicDelay(rotationTime, newlyConnectedTileCount++);
    }

    nextVertex = [...tile.externalPath].find((vertex: number) => vertex !== nextExternalVertex);
    if (!nextVertex) break; // needed cause in theory find can return undefined - but this can't happen here

    nextExternalVertex = adjacencyList[nextVertex][0]; // will be undefined if it points off board
  }

  return { ...state, idToTileState, pathComplete: nextVertex === state.endVertex };
}

function logarithmicDelay(rotationTime: number, n: number): number {
  // return offset + 100 * n;
  // return offset * Math.E ** (-12 * n);
  const offset = Math.min(Math.abs(rotationTime - 400), rotationTime);
  return offset + Math.log(1 + n) * 200;
}
