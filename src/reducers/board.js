// @flow

import type { BoardState, CustomBoard, Tiles, Tile } from "src/types";

import { rotateTile } from "src/utils/tile";

const defaultState: BoardState = {
  tiles: {},
  rows: [[]],
  adjacencyList: [[]],
  vertexToTile: {},
  startingVertex: -1,
  dimensions: { width: 5, height: 4 },
  rotationTime: 750
};

const tiles = (state: BoardState & CustomBoard, action: { type: string, [string]: any }) => {
  switch (action.type) {
    case "SET_BOARD":
      const combinedState = Object.assign({}, defaultState, action.board);
      return { ...combinedState, tiles: updateBoard(combinedState.tiles, combinedState) };
    case "ROTATE_TILE":
      const newTiles: Tiles = {
        ...state.tiles,
        [action.id]: rotateTile(state.tiles[action.id], action.rotation)
      };

      return {
        ...state,
        tiles: updateBoard(newTiles, state)
      };
    default:
      return state;
  }
};

export default tiles;

function updateBoard(tiles: Tiles, state: BoardState): Tiles {
  const { adjacencyList, startingVertex, vertexToTile, rotationTime } = state;

  // disconnect all tiles
  // having to use parseInt to make flow happy - related to https://github.com/facebook/flow/issues/2221
  Object.keys(tiles).forEach(tileId => {
    const tile: Tile = tiles[parseInt(tileId)];
    tile.wasConnected = tile.connected;
    tile.connected = false;
    tile.animationDelay = 0;
  });

  let nextExternalVertex: number | void = startingVertex;
  let newlyConnectedTiles: number = 0;

  while (typeof nextExternalVertex === "number") {
    const tileId: number = vertexToTile[nextExternalVertex];
    console.log(tileId);
    const tile: Tile = tiles[tileId];
    const vertexConnectsToPipe = tile.externalPath.has(nextExternalVertex);
    if (!vertexConnectsToPipe) break;

    tile.connected = true;
    if (!tile.wasConnected) {
      const offset = Math.min(Math.abs(rotationTime - 400), rotationTime);
      tile.animationDelay = exponentialDelay(offset, newlyConnectedTiles++);
    }

    const nextVertex: number | void = [...tile.externalPath].find(
      (vertex: number) => vertex !== nextExternalVertex
    );
    if (!nextVertex) break; // needed cause in theory find can return undefined - but this can't happen here

    nextExternalVertex = adjacencyList[nextVertex][0]; // will be undefined if it points off board
  }

  return tiles;
}

function exponentialDelay(offset, n): number {
  // return offset + 100 * n;
  // return offset * Math.E ** (-12 * n);
  return offset + Math.log(1 + n) * 200;
}
