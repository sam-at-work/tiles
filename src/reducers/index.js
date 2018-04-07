// @flow

import type { Vertex, Tiles, BoardState, TileState } from "src/types";
import { rotateTile, getOppositeEnfOfPath } from "../functions/tile";

export default function(state: BoardState, action: { type: string, [string]: any }) {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return updateBoard(action.board, action.board.idToTileState);

    case "ROTATE_TILE":
      const newTiles: Tiles = {
        ...state.idToTileState,
        [action.id]: rotateTile(state.idToTileState[action.id], action.rotation),
      };

      return updateBoard(state, newTiles);
    default:
      return state;
  }
}

/**
 * Updates the state of the board based on the current rotation of the tile.
 * idToTileState is updated in place - so must either be a copy or the mapping before initial state is set.
 *
 * @param state
 * @param idToTileState
 * @returns {{startingVertex: number, endVertex: number, vertexToTileId: {[p: number]: number}, adjacencyList: Array<Array<number>>, idToTileState: {[p: number]: TileState}, pathComplete: boolean, width: number, height: number, rotationTime: number}}
 */
function updateBoard(state: BoardState, idToTileState: Tiles): BoardState {
  const { adjacencyList, startingVertex, vertexToTileId, rotationTime } = state;

  // disconnect all tiles
  const prevConnectedTiles: Set<number> = new Set();
  // having to use parseInt to make flow happy - related to https://github.com/facebook/flow/issues/2221
  Object.keys(idToTileState).forEach(tileIdStr => {
    const tileId: number = parseInt(tileIdStr);
    const tile: TileState = idToTileState[tileId];
    if (tile.connected) prevConnectedTiles.add(tile.id);
    tile.connected = false;
    tile.animationDelay = 0;
  });

  let nextExternalVertex: Vertex | void = startingVertex;
  let newlyConnectedTileCount: number = 0;
  let nextVertex: Vertex | void = undefined;

  while (nextExternalVertex !== undefined) {
    const tileId: number = vertexToTileId[nextExternalVertex];
    const tile: TileState = idToTileState[tileId];
    const vertexConnectsToPipe = tile.externalPath.has(nextExternalVertex);
    if (!vertexConnectsToPipe) break;

    tile.connected = true;
    if (!prevConnectedTiles.has(tile.id)) {
      tile.animationDelay = logarithmicDelay(rotationTime, newlyConnectedTileCount++);
    }

    nextVertex = getOppositeEnfOfPath(tile.externalPath, nextExternalVertex);
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
