// @flow

// export type Tile = {
//   pipeType: number,
//   currentRotation: number,
//   id: number,
//   edgeToVertex: { [number]: number },
//   connected: boolean,
//   tileSides: number,
//   internalPath: Set<number>,
//   externalPath: Set<number>,
//   animationDelay: number,
//   wasConnected?: boolean,
//   canRotate: boolean
// };

export type Tiles = {
  [number]: TileState
};

// export type AdjacencyList = Array<Array<number>>;

export type ProblemState = {
  startingVertex: number,
  endVertex: number,
  vertexToTileId: { [number]: number },
  adjacencyList: Array<Array<number>>,
  idToTileState: { [number]: TileState },
  pathComplete: boolean,
  width: number,
  height: number,
  rotationTime: number
};

export type TileState = {
  id: number,
  currentRotation: number,
  internalPath: Set<number>,
  externalPath: Set<any>, // flow - try change to number
  totalSides: number,
  tileSideToVertex: { [number]: number },
  connected: boolean,
  animationDelay: number | null,
  pipeType: number
};
