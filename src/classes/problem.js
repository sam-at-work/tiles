// @flow

import { TileFactory, rotateTile } from "./tile";
import type { TileState, ProblemState } from "../types";

export default class ProblemFactory {
  height: number;
  width: number;
  startingVertex: number = 0; // make configurable?;
  tileSides: number = 4; // make configurable?
  pathComplete: boolean = false;
  rotationTime: number = 750; //ms
  endVertex: number;
  vertexToTileId: { [number]: number } = {};
  adjacencyList: Array<Array<number>>;
  idToTileState: { [number]: TileState } = {};

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;

    const totalNodes: number = height * width * this.tileSides; // one node on each side of each tile
    this.adjacencyList = Array.from({ length: totalNodes }, () => []);

    let nextTileId = 0;
    let nextVertexId = 0;

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        let isStartingTile = false;
        const tileId = nextTileId++;

        const tileSideToVertex: { [number]: number } = {};

        for (let side = 0; side < this.tileSides; side++) {
          const vertexId = nextVertexId++;
          if (vertexId == this.startingVertex) isStartingTile = true;

          tileSideToVertex[side] = vertexId;
          this.vertexToTileId[vertexId] = tileId;
        }

        let tile: TileState = new TileFactory(tileId, this.tileSides, tileSideToVertex).getState();
        tile = rotateTile(tile, Math.floor(Math.random() * this.tileSides));

        // make sure first tile is always connected;
        if (isStartingTile) {
          while (!tile.externalPath.has(this.startingVertex)) {
            tile = rotateTile(tile, 1);
          }
        }

        this.idToTileState[tileId] = tile;

        // set endVertex to top of last tile in first column
        if (row === 0 && col === width - 1) {
          this.endVertex = tileSideToVertex[0];
        }

        // connect tile to prev column
        if (col > 0) {
          const prevColTile = this.idToTileState[tileId - 1];
          this.adjacencyList[tileSideToVertex[3]].push(prevColTile.tileSideToVertex[1]);
          this.adjacencyList[prevColTile.tileSideToVertex[1]].push(tileSideToVertex[3]);
        }

        // connect tile to pre row
        if (row > 0) {
          const prevRowTile = this.idToTileState[tileId - width];
          this.adjacencyList[tileSideToVertex[0]].push(prevRowTile.tileSideToVertex[2]);
          this.adjacencyList[prevRowTile.tileSideToVertex[2]].push(tileSideToVertex[0]);
        }
      }
    }
  }

  getState(): ProblemState {
    return {
      startingVertex: this.startingVertex,
      endVertex: this.endVertex,
      vertexToTileId: this.vertexToTileId,
      adjacencyList: this.adjacencyList,
      idToTileState: this.idToTileState,
      pathComplete: this.pathComplete,
      width: this.width,
      height: this.height,
      rotationTime: this.rotationTime
    };
  }
}
