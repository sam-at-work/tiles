// @flow

import TilePiece from "./tile";

export default class Problem {
  height: number;
  width: number;
  startingVertex: number = 0; // make configurable?;
  tileSides: number = 4; // make configurable?
  rotationTime: number = 750; //ms
  endVertex: number;
  vertexToTileId: Map<number, number> = new Map();
  adjacencyList: Array<Array<number>>;
  idToTile: { [number]: TilePiece } = {};
  pathComplete: boolean = false;

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
          this.vertexToTileId.set(vertexId, tileId);
        }

        const tile: TilePiece = new TilePiece(tileId, this.tileSides, tileSideToVertex);
        this.idToTile[tileId] = tile;

        // make sure first tile is always connected;
        if (isStartingTile) {
          while (!tile.externalPath.has(this.startingVertex)) {
            tile.rotateInternalPath(1);
          }
        }

        // set endVertex to top of last tile in first column
        if (row === 0 && col === width - 1) {
          this.endVertex = tileSideToVertex[0];
        }

        // connect tile to prev column
        if (col > 0) {
          const prevColTile = this.idToTile[tileId - 1];
          this.adjacencyList[tileSideToVertex[3]].push(prevColTile.tileSideToVertex[1]);
          this.adjacencyList[prevColTile.tileSideToVertex[1]].push(tileSideToVertex[3]);
        }

        // connect tile to pre row
        if (row > 0) {
          const prevRowTile = this.idToTile[tileId - width];
          this.adjacencyList[tileSideToVertex[0]].push(prevRowTile.tileSideToVertex[2]);
          this.adjacencyList[prevRowTile.tileSideToVertex[2]].push(tileSideToVertex[0]);
        }
      }
    }
  }
}
