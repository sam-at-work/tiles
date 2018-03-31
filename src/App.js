// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "src/containers/Board";
import { setBoard, setTiles, setTileSides } from "src/actionCreators";
import "./App.css";

type Tile = {|
  pipeType: number,
  rotation: number,
  id: number,
  edgeToVertex: { [number]: number },
  connected: boolean
|};

const boardHeight = 4;
const boardWidth = 3;
const tileSides = 4;

let nextTileId = 0;
let nextVertexId = 0;
function generateRandomBoard(height: number, width: number) {
  const tiles = {};
  const rows = [];

  const totalNodes = boardHeight * boardWidth * tileSides; // one node on each side of each tile
  const adjecencyList = Array.from({ length: totalNodes }, () => []);

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

      const tile: Tile = {
        // number of edges between entering and exiting of pipe. 0 <= x <= (tileSides / 2 - 1)
        pipeType: Math.floor(Math.random() * tileSides / 2),
        rotation: Math.floor(Math.random() * tileSides),
        id: tileId,
        edgeToVertex: tileEdgeToVertex,
        connected: false
      };

      if (col > 0) {
        adjecencyList[tileEdgeToVertex[3]].push(tiles[rowArray[col - 1]].edgeToVertex[1]);
        adjecencyList[tiles[rowArray[col - 1]].edgeToVertex[1]].push(tileEdgeToVertex[3]);
      }

      if (row > 0) {
        adjecencyList[tileEdgeToVertex[0]].push(tiles[rows[row - 1][col]].edgeToVertex[2]);
        adjecencyList[tiles[rows[row - 1][col]].edgeToVertex[2]].push(tileEdgeToVertex[0]);
      }

      rowArray[col] = tileId;
      tiles[tileId] = tile;
    }
  }

  return { tiles, rows, adjecencyList };
}

class App extends Component<{}> {
  constructor({ dispatch }: { dispatch: Function }) {
    super();
    const { tiles, rows, adjecencyList } = generateRandomBoard(boardHeight, boardWidth);

    console.log(adjecencyList);

    dispatch(setBoard(rows));
    dispatch(setTiles(tiles));
    dispatch(setTileSides(tileSides)); // this should work without too since it is default;
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
