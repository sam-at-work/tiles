// @flow

import type { SetOfPaths, ExternalPath, Vertex, Rotation, TileState } from "../types";

export class TileFactory {
  id: number;
  totalSides: number;
  tileSideToVertex: { [number]: Vertex };
  pipeType: number;
  currentRotation: Rotation;
  internalPath: Set<number>; // based on pipe rotation - start and end sides.
  externalPath: Set<Vertex>; // based on pipe rotation - 'any' to get around flow error
  connected: boolean = false;

  constructor(id: number, totalSides: number, tileSideToVertex: { [number]: number }) {
    this.id = id;
    this.totalSides = totalSides;
    this.tileSideToVertex = tileSideToVertex;

    this.pipeType = Math.floor(Math.random() * totalSides / 2);
    this.currentRotation = 0;

    this.internalPath = new Set([0, this.pipeType + 1]);
    this.externalPath = new Set([...this.internalPath].map(side => tileSideToVertex[side])); // flow error?
  }

  getState() {
    return {
      id: this.id,
      currentRotation: this.currentRotation,
      internalPath: this.internalPath,
      externalPath: this.externalPath,
      totalSides: this.totalSides,
      tileSideToVertex: this.tileSideToVertex,
      connected: false,
      animationDelay: 0,
      pipeType: this.pipeType
    };
  }
}

// https://stackoverflow.com/a/4467559
function mod(m: number, n: number) {
  return (m % n + n) % n;
}

export function rotateTile(tileToRotate: TileState, x: number) {
  const t = { ...tileToRotate };
  t.currentRotation += x;
  t.internalPath = new Set([...t.internalPath].map(side => mod(side + x, t.totalSides)));
  t.externalPath = new Set([...t.internalPath].map(side => t.tileSideToVertex[side]));
  return t;
}

export function getOppositeEnfOfPath(p: ExternalPath, v: Vertex): Vertex {
  return [...p].filter((vertex: number) => vertex !== v)[0];
}

// CURRENTLY ONLY WORKS FOR SQUARE!!!
export function getAllPaths(t: TileState): SetOfPaths {
  const paths: SetOfPaths = new Set();

  if (t.pipeType === 0) {
    // every rotation has a different path through tile
    for (var i = 0; i < t.totalSides; i++) {
      const internalPath = new Set([i, i + 1].map(side => mod(side, t.totalSides)));
      paths.add(new Set([...internalPath].map(side => t.tileSideToVertex[side])));
    }
  } else if (t.pipeType === 1) {
    for (var i = 0; i < t.totalSides / 2; i++) {
      const internalPath = new Set([i, i + 2].map(side => mod(side, t.totalSides)));
      paths.add(new Set([...internalPath].map(side => t.tileSideToVertex[side])));
    }
  }
  return paths;
}
