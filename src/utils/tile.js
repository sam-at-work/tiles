// @flow

import type { Tile } from "../types";

export default class TilePiece {
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
    this.currentRotation = Math.floor(Math.random() * totalSides);

    this.internalPath = new Set([0, this.pipeType + 1]);
    this.externalPath = new Set([...this.internalPath].map(side => tileSideToVertex[side])); // flow error?
  }

  rotateInternalPath(x: number) {
    this.currentRotation += x;
    this.internalPath = new Set([...this.internalPath].map(side => mod(side + x, this.totalSides)));
    this.externalPath = new Set([...this.internalPath].map(side => this.tileSideToVertex[side]));
  }
}

// https://stackoverflow.com/a/4467559
export function mod(m: number, n: number) {
  return (m % n + n) % n;
}

// export function rotateInternalPath(
//   { internalPath, tileSides }: { internalPath: Set<number>, tileSides: number },
//   rotation: number
// ): Set<number> {
//   return new Set([...internalPath].map(vertex => mod(vertex + rotation, tileSides)));
// }
//
// export function rotateTile(tile: Tile, rotation: number): Tile {
//   const currentRotation: number = tile.currentRotation + rotation;
//   const internalPath: Set<number> = rotateInternalPath(tile, rotation);
//   const externalPath: Set<number> = new Set(
//     [...internalPath].map(vertex => tile.edgeToVertex[vertex])
//   );
//   return {
//     ...tile,
//     currentRotation,
//     internalPath,
//     externalPath
//   };
// }
