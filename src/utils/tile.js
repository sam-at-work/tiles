// @flow

import type { Tile } from "../types";

export function rotateInternalPath(
  { internalPath, tileSides }: { internalPath: Set<number>, tileSides: number },
  rotation: number
): Set<number> {
  return new Set([...internalPath].map(vertex => (vertex + rotation) % tileSides));
}

export function rotateTile(tile: Tile, rotation: number): Tile {
  const currentRotation: number = tile.currentRotation + rotation;
  const internalPath: Set<number> = rotateInternalPath(tile, rotation);
  const externalPath: Set<number> = new Set(
    [...internalPath].map(vertex => tile.edgeToVertex[vertex])
  );
  return {
    ...tile,
    currentRotation,
    internalPath,
    externalPath
  };
}
