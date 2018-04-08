// @flow

import type { TileId, SetOfPaths, ExternalPath, Vertex, TileState } from "../types";

export function newTile(
  id: TileId,
  totalSides: number,
  tileSideToVertex: { [number]: Vertex }
): TileState {
  const pipeType: number = Math.floor(Math.random() * totalSides / 2);
  // based on pipe rotation - start and end sides.
  const internalPath: Array<number> = [0, pipeType + 1];
  // based on internalPath
  const externalPath: Array<Vertex> = internalPath.map(side => tileSideToVertex[side]);

  return {
    animationDelay: 0,
    connected: false,
    currentRotation: 0,
    externalPath,
    id,
    internalPath,
    pipeType,
    totalSides,
    tileSideToVertex,
  };
}

// https://stackoverflow.com/a/4467559
function mod(m: number, n: number) {
  return (m % n + n) % n;
}

export function rotateTile(tileToRotate: TileState, x: number): TileState {
  const t = { ...tileToRotate };
  t.currentRotation += x;
  t.internalPath = t.internalPath.map(side => mod(side + x, t.totalSides));
  t.externalPath = t.internalPath.map(side => t.tileSideToVertex[side]);
  return t;
}

export function getOppositeEnfOfPath(p: ExternalPath, v: Vertex): Vertex {
  return p.filter((vertex: number) => vertex !== v)[0];
}

// CURRENTLY ONLY WORKS FOR SQUARE!!!
export function getAllPaths(t: TileState): SetOfPaths {
  const paths: SetOfPaths = new Set();

  if (t.pipeType === 0) {
    // every rotation has a different path through tile
    for (var i = 0; i < t.totalSides; i++) {
      const internalPath = [i, i + 1].map(side => mod(side, t.totalSides));
      paths.add(internalPath.map(side => t.tileSideToVertex[side]));
    }
  } else if (t.pipeType === 1) {
    for (var i = 0; i < t.totalSides / 2; i++) {
      const internalPath = [i, i + 2].map(side => mod(side, t.totalSides));
      paths.add(internalPath.map(side => t.tileSideToVertex[side]));
    }
  }
  return paths;
}
