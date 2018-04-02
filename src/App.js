// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "src/containers/Board";
import { setBoard } from "src/actionCreators";
import "./App.css";

import type { Tile } from "src/types";
import type { BoardState } from "./types";
import { rotateInternalPath } from "./utils/tile";

const boardHeight = 8;
const boardWidth = 6;
const tileSides = 4;
const rotationTime = 750;

let nextTileId = 0;
let nextVertexId = 0;
function generateRandomBoard(height: number, width: number): BoardState {
  const startingVertex = 0;
  let endVertex: number;
  const tiles: { [number]: Tile } = {};
  const rows: Array<Array<number>> = [];

  const totalNodes: number = height * width * tileSides; // one node on each side of each tile
  const adjacencyList: Array<Array<number>> = Array.from({ length: totalNodes }, () => []);

  const vertexToTile: { [number]: number } = {}; // unused???

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

      if (row === 0 && col === width - 1) {
        endVertex = tileEdgeToVertex[0];
      }

      // number of edges between entering and exiting of pipe. 0 <= x <= (tileSides / 2 - 1)
      const pipeType = Math.floor(Math.random() * tileSides / 2);
      do {
        var rotation = Math.floor(Math.random() * tileSides);
        var internalPath = rotateInternalPath(
          { internalPath: new Set([0, pipeType + 1]), tileSides },
          rotation
        );
        var externalPath = new Set([...internalPath].map(vertex => tileEdgeToVertex[vertex]));
      } while (
        Object.values(tileEdgeToVertex).indexOf(startingVertex) !== -1 &&
        !externalPath.has(startingVertex)
      );

      const tile: Tile = {
        canRotate: !externalPath.has(startingVertex),
        pipeType,
        currentRotation: rotation,
        id: tileId,
        edgeToVertex: tileEdgeToVertex,
        connected: false,
        tileSides,
        internalPath,
        externalPath,
        animationDelay: 0,
        pathComplete: false
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
    dimensions: { width: width, height: height },
    startingVertex,
    endVertex,
    rotationTime,
    pathComplete: false
  };
}

function getHeightAndWidthBasedOnViewport() {
  let viewportWidth = document.documentElement.clientWidth;
  let viewportHeight = document.documentElement.clientHeight;
  let isLandscape = false;

  if (viewportWidth > viewportHeight) {
    isLandscape = true;
    const temp = viewportWidth;
    viewportWidth = viewportHeight;
    viewportHeight = viewportWidth;
  }

  const viewportRatio = viewportWidth / viewportHeight;

  const widths = [[6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10]];
  const gameAspectRatios = widths.map(([x, y]) => x / y);

  const closestIndex = gameAspectRatios.reduce(function(_, curr, currentIndex) {
    return Math.abs(curr - viewportRatio) <
      Math.abs(gameAspectRatios[currentIndex - 1] - viewportRatio)
      ? currentIndex
      : currentIndex - 1;
  });

  let width, height;
  if (isLandscape) {
    width = widths[closestIndex][1];
    height = widths[closestIndex][0];
  } else {
    width = widths[closestIndex][0];
    height = widths[closestIndex][1];
  }

  return { boardWidth: width, boardHeight: height - 2, isLandscape };
}

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();
    // const { boardWidth, boardHeight, isLandscape } = getHeightAndWidthBasedOnViewport();

    const board: BoardState = generateRandomBoard(boardHeight, boardWidth);
    console.log(board.vertexToTile);
    dispatch(setBoard(board));
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
