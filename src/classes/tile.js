// @flow

import type { TileState } from "../types";

export class TileFactory {
  id: number;
  totalSides: number;
  tileSideToVertex: { [number]: number };
  pipeType: number;
  currentRotation: number;
  internalPath: Set<number>; // based on pipe rotation - start and end sides.
  externalPath: Set<any>; // based on pipe rotation - 'any' to get around flow error
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
      animationDelay: null,
      pipeType: this.pipeType
    };
  }
}

// https://stackoverflow.com/a/4467559
export function mod(m: number, n: number) {
  return (m % n + n) % n;
}

export function rotateTile(t: TileState, x: number) {
  t.currentRotation += x;
  t.internalPath = new Set([...t.internalPath].map(side => mod(side + x, t.totalSides)));
  t.externalPath = new Set([...t.internalPath].map(side => t.tileSideToVertex[side]));
  return { ...t };
}
