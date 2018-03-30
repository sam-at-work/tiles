export const rotateTile = (id, rotation) => ({
  type: "ROTATE_TILE",
  id,
  rotation
});

export const setBoard = board => ({
  type: "SET_BOARD",
  board
});

export const setTiles = tiles => ({
  type: "SET_TILES",
  tiles
});

export const setTileSides = sides => ({
  type: "SET_TILE_SIDES",
  sides
});
