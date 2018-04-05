// @flow

import { TileFactory, rotateTile } from "./tile";
import type { Vertex, TileState, GameState } from "../types";

export default function initialGameState(height: number, width: number): GameState {
  const tileSides: number = 4; // make configurable?
  const rotationTime: number = 750; //ms
  const startingVertex: Vertex = 0; // make configurable?;
  let endVertex: Vertex = -1; // set below

  const vertexToTileId: { [Vertex]: number } = {};
  const idToTileState: { [number]: TileState } = {};

  const totalNodes: number = height * width * tileSides; // one node on each side of each tile
  const adjacencyList: Array<Array<number>> = Array.from({ length: totalNodes }, () => []);

  let nextTileId = 0;
  let nextVertexId = 0;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let isStartingTile = false;
      const tileId = nextTileId++;

      const tileSideToVertex: { [number]: number } = {};

      // assign vertices to each side of the tile
      for (let side = 0; side < tileSides; side++) {
        const vertexId = nextVertexId++;
        if (vertexId == startingVertex) isStartingTile = true;

        tileSideToVertex[side] = vertexId;
        vertexToTileId[vertexId] = tileId;
      }

      let tile: TileState = new TileFactory(tileId, tileSides, tileSideToVertex).getState();
      tile = rotateTile(tile, Math.floor(Math.random() * tileSides));

      // make sure first tile is always connected;
      if (isStartingTile) {
        while (!tile.externalPath.has(startingVertex)) {
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
        const prevColTile = idToTileState[tileId - 1];
        adjacencyList[tileSideToVertex[3]].push(prevColTile.tileSideToVertex[1]);
        adjacencyList[prevColTile.tileSideToVertex[1]].push(tileSideToVertex[3]);
      }

      // connect tile to pre row
      if (row > 0) {
        const prevRowTile = idToTileState[tileId - width];
        adjacencyList[tileSideToVertex[0]].push(prevRowTile.tileSideToVertex[2]);
        adjacencyList[prevRowTile.tileSideToVertex[2]].push(tileSideToVertex[0]);
      }
    }
  }

  if (endVertex === -1) throw Error("End vertex not set");

  return {
    startingVertex,
    endVertex,
    vertexToTileId,
    adjacencyList,
    idToTileState,
    pathComplete: false,
    width,
    height,
    rotationTime
  };
}
