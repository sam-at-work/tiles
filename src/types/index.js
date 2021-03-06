// @flow
export type TileId = number;
export type Rotation = number;
export type Vertex = number;
export type Path = Array<TileId>;
export type Paths = Array<Path>;

export type Tiles = {
  [number]: TileState,
};

export type SetOfPaths = Set<Array<Vertex>>;

export type ExternalPath = Array<Vertex>;
// export type AdjacencyList = Array<Array<number>>;

export type BoardState = {
  adjacencyList: Array<Array<Vertex>>,
  endVertex: number,
  gameStarted: boolean,
  height: number,
  idToTileState: { [number]: TileState },
  pathComplete: boolean,
  rotationTime: number,
  startingVertex: number,
  vertexToTileId: { [Vertex]: number },
  width: number,
};

export type BoardMeta = BoardState & {
  solutions: Paths,
  shortestPathLength: number,
};

export type TileState = {
  id: number,
  currentRotation: Rotation,
  internalPath: Array<number>,
  externalPath: ExternalPath,
  totalSides: number,
  tileSideToVertex: { [number]: Vertex },
  connected: boolean,
  animationDelay: number | null,
  pipeType: number,
};
