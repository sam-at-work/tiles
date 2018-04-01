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
      return action.board;
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

  const startTileId: number = vertexToTile[startingVertex];
  const startTile: Tile = tiles[startTileId];

  const vertexConnectsToPipe = startTile.externalPath.has(startingVertex);

  tiles = connectTile(tiles, startTileId, vertexConnectsToPipe);

  if (!vertexConnectsToPipe) return tiles;

  const nextVertex: number | void = [...startTile.externalPath].find(
    (vertex: number) => vertex !== startingVertex
  );

  if (!nextVertex) return tiles;

  let nextNextVertex = adjacencyList[nextVertex][0];

  return tiles;
}

function doesPipeInTileTouchVerex(vertex: number, tile: Tile) {
  if (!Object.values(tile.edgeToVertex).includes(vertex)) {
    console.log("broke");
  }
  const pipeConnectedVertices = pipeConnectedVerticesInTile(tile);
  return pipeConnectedVertices.has(vertex);
}

function pipeConnectedVerticesInTile(tile) {
  if (tile.tileSides === 4) {
    // if ()
  }
  const connectedEdge = tile.rotation % tile.tileSides;
  const secondConnectedEdge = (connectedEdge + 1 + tile.pipeType) % tile.tileSides;
  return new Set([tile.edgeToVertex[connectedEdge], tile.edgeToVertex[secondConnectedEdge]]);
}

function connectTile(tiles, tileId, connected: boolean) {
  return {
    ...tiles,
    [tileId]: {
      ...tiles[tileId],
      connected: connected
    }
  };
}
