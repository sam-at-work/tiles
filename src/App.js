// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "src/containers/Board";
import { setBoard } from "src/actionCreators";
import "./App.css";

import type { Tile } from "src/types";
import type { BoardState } from "./types";
import { rotateInternalPath } from "./utils/tile";

const boardHeight = 4;
const boardWidth = 6;
const tileSides = 4;

let nextTileId = 0;
let nextVertexId = 0;
function generateRandomBoard(height: number, width: number): BoardState {
  const tiles: { [number]: Tile } = {};
  const rows: Array<Array<number>> = [];

  const totalNodes: number = boardHeight * boardWidth * tileSides; // one node on each side of each tile
  const adjacencyList: Array<Array<number>> = Array.from({ length: totalNodes }, () => []);

  const vertexToTile: { [number]: number } = {};

  for (let row = 0; row < height; row++) {
    const rowArray = [];
    rows.push(rowArray);
    for (let col = 0; col < width; col++) {
      const tileId = nextTileId++;

      const tileEdgeToVertex = {};
      for (let side = 0; side < tileSides; side++) {
        const vertexId = nextVertexId++;
        tileEdgeToVertex[side] = vertexId;
        vertexToTile[vertexId] = tileId;
      }

      // number of edges between entering and exiting of pipe. 0 <= x <= (tileSides / 2 - 1)
      const pipeType = Math.floor(Math.random() * tileSides / 2);
      const rotation = Math.floor(Math.random() * tileSides);
      const internalPath = rotateInternalPath(
        { internalPath: new Set([0, pipeType + 1]), tileSides },
        rotation
      );
      const externalPath = new Set([...internalPath].map(vertex => tileEdgeToVertex[vertex]));

      const tile: Tile = {
        pipeType,
        currentRotation: rotation,
        id: tileId,
        edgeToVertex: tileEdgeToVertex,
        connected: false,
        tileSides,
        internalPath,
        externalPath,
        animationDelay: 0
      };

      if (col > 0) {
        adjacencyList[tileEdgeToVertex[3]].push(tiles[rowArray[col - 1]].edgeToVertex[1]);
        adjacencyList[tiles[rowArray[col - 1]].edgeToVertex[1]].push(tileEdgeToVertex[3]);
      }

      if (row > 0) {
        adjacencyList[tileEdgeToVertex[0]].push(tiles[rows[row - 1][col]].edgeToVertex[2]);
        adjacencyList[tiles[rows[row - 1][col]].edgeToVertex[2]].push(tileEdgeToVertex[0]);
      }

      rowArray[col] = tileId;
      tiles[tileId] = tile;
    }
  }

  return {
    tiles,
    rows,
    adjacencyList,
    vertexToTile,
    dimensions: { width: boardWidth, height: boardHeight }
  };
}

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();
    const board: BoardState = generateRandomBoard(boardHeight, boardWidth);
    console.log(board.vertexToTile);
    dispatch(setBoard(board));
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
