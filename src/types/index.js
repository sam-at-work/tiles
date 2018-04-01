// @flow

export type Tile = {
  pipeType: number,
  currentRotation: number,
  id: number,
  edgeToVertex: { [number]: number },
  connected: boolean,
  tileSides: number,
  internalPath: Set<number>,
  externalPath: Set<number>
};

export type Tiles = {
  [number]: Tile
};

export type AdjacencyList = Array<Array<number>>;

export type BoardState = {|
  tiles: Tiles,
  rows: Array<Array<number>>,
  adjacencyList: AdjacencyList,
  startingVertex: number,
  vertexToTile: { [number]: number }
|};
