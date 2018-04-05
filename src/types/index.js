// @flow
export type TileId = number;
export type Rotation = number;
export type Vertex = number;

export type Tiles = {
  [number]: TileState
};

export type SetOfPaths = Set<Set<Vertex>>;

export type ExternalPath = Set<Vertex>;
// export type AdjacencyList = Array<Array<number>>;

export type GameState = {
  startingVertex: number,
  endVertex: number,
  vertexToTileId: { [Vertex]: number },
  adjacencyList: Array<Array<Vertex>>,
  idToTileState: { [number]: TileState },
  pathComplete: boolean,
  width: number,
  height: number,
  rotationTime: number
};

export type TileState = {
  id: number,
  currentRotation: Rotation,
  internalPath: Set<number>,
  externalPath: ExternalPath,
  totalSides: number,
  tileSideToVertex: { [number]: Vertex },
  connected: boolean,
  animationDelay: number | null,
  pipeType: number
};
