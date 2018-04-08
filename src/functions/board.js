// @flow

import { newTile, rotateTile } from "./tile";

import type { BoardState, TileId, TileState, Vertex } from "../types";

/**
 * When w=2, total-paths=h
 * When w=3, total-paths=h^2
 * When w=4, total-paths=h^3 approx.
 *
 * So we conclude that max-paths = h^(w-1)
 */
export function newBoardState(height: number, width: number): BoardState {
  const tileSides: number = 4; // make configurable?
  const rotationTime: number = 750; //ms
  const startingVertex: Vertex = 0; // make configurable?;
  let endVertex: Vertex = -1; // set below

  const vertexToTileId: { [Vertex]: number } = {};
  const idToTileState: { [number]: TileState } = {};

  const totalNodes: number = height * width * tileSides; // one node on each side of each tile
  const adjacencyList: Array<Array<number>> = Array.from({ length: totalNodes }, () => []);

  let nextTileId: Vertex = 0;
  let nextVertexId: TileId = 0;
  let isStartingTile: boolean = false;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const tileId: TileId = nextTileId++;
      const tileSideToVertex: { [number]: Vertex } = {};

      // assign vertices to each side of the tile
      for (let side = 0; side < tileSides; side++) {
        const vertexId: Vertex = nextVertexId++;
        if (vertexId == startingVertex) isStartingTile = true;

        tileSideToVertex[side] = vertexId;
        vertexToTileId[vertexId] = tileId;
      }

      let tile: TileState = newTile(tileId, tileSides, tileSideToVertex);
      tile = rotateTile(tile, Math.floor(Math.random() * tileSides));

      // make sure first tile is always connected;
      if (isStartingTile) {
        isStartingTile = false;
        while (!tile.externalPath.includes(startingVertex)) {
          tile = rotateTile(tile, 1);
        }
      }

      idToTileState[tileId] = tile;

      // set endVertex to top of last tile in first column
      if (row === 0 && col === width - 1) {
        endVertex = tileSideToVertex[0];
      }

      // connect tile to prev column
      if (col > 0) {
        const prevColTile: TileState = idToTileState[tileId - 1];
        adjacencyList[tileSideToVertex[3]].push(prevColTile.tileSideToVertex[1]);
        adjacencyList[prevColTile.tileSideToVertex[1]].push(tileSideToVertex[3]);
      }

      // connect tile to pre row
      if (row > 0) {
        const prevRowTile: TileState = idToTileState[tileId - width];
        adjacencyList[tileSideToVertex[0]].push(prevRowTile.tileSideToVertex[2]);
        adjacencyList[prevRowTile.tileSideToVertex[2]].push(tileSideToVertex[0]);
      }
    }
  }

  if (endVertex === -1) throw Error("End vertex not set");

  return {
    adjacencyList,
    endVertex,
    gameStarted: false,
    height,
    idToTileState,
    pathComplete: false,
    rotationTime,
    startingVertex,
    width,
    vertexToTileId,
  };
}
