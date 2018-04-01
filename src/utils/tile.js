// @flow

import type { Tile } from "../types";

// https://stackoverflow.com/a/4467559
export function mod(m: number, n: number) {
  return (m % n + n) % n;
}

export function rotateInternalPath(
  { internalPath, tileSides }: { internalPath: Set<number>, tileSides: number },
  rotation: number
): Set<number> {
  return new Set([...internalPath].map(vertex => mod(vertex + rotation, tileSides)));
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
