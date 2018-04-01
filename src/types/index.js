// @flow

export type Tile = {
  pipeType: number,
  currentRotation: number,
  id: number,
  edgeToVertex: { [number]: number },
  connected: boolean,
  tileSides: number,
  internalPath: Set<number>,
  externalPath: Set<number>,
  animationDelay: number,
  wasConnected?: boolean
};

export type Tiles = {
  [number]: Tile
};

export type AdjacencyList = Array<Array<number>>;

export type BoardState = {|
  tiles: Tiles,
  rows: Array<Array<number>>,
  adjacencyList: AdjacencyList,
  vertexToTile: { [number]: number },
  startingVertex: number,
  dimensions: {
    width: number,
    height: number
  },
  rotationTime?: number
|};
