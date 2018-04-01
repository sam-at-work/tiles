// @flow

import type { BoardState, AdjacencyList, Tiles, Tile } from "src/types";

import { rotateTile } from "src/utils/tile";

const defaultState: BoardState = {
  tiles: {},
  rows: [[]],
  adjacencyList: [[]],
  vertexToTile: {},
  startingVertex: -1
};

const tiles = (state: BoardState = defaultState, action: { type: string, [string]: any }) => {
  switch (action.type) {
    case "SET_BOARD":
      return { ...action.board, tiles: updateBoard(action.board.tiles, action.board) };
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
  const { adjacencyList, startingVertex, vertexToTile } = state;

  // disconnect all tiles
  // having to use parseInt to make flow happy - related to https://github.com/facebook/flow/issues/2221
  Object.keys(tiles).map(tileId => (tiles[parseInt(tileId)].connected = false));

  let nextExternalVertex: number | void = startingVertex;

  while (typeof nextExternalVertex === "number") {
    const tileId: number = vertexToTile[nextExternalVertex];
    console.log(tileId);
    const tile: Tile = tiles[tileId];
    const vertexConnectsToPipe = tile.externalPath.has(nextExternalVertex);
    if (!vertexConnectsToPipe) break;

    tile.connected = true;

    const nextVertex: number | void = [...tile.externalPath].find(
      (vertex: number) => vertex !== nextExternalVertex
    );
    if (!nextVertex) break; // needed cause in theory find can return undefined - but this can't happen here

    nextExternalVertex = adjacencyList[nextVertex][0]; // will be undefined if it points off board
  }

  return tiles;
}
