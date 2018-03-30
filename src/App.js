// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "src/containers/Board";
import { setBoard, setTiles, setTileSides } from "src/actionCreators";
import "./App.css";

const boardHeight = 3;
const boardWidth = boardHeight;
const tileSides = 4;

let nextTileId = 0;
function generateRandomBoard(height: number, width: number) {
  const tiles = {};
  const rows = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    rows.push(row);
    for (let col = 0; col < width; col++) {
      const tileId = nextTileId++;
      const tile = {
        // number of edges between entering and exiting of pipe. 0 <= x <= (tileSides / 2 - 1)
        pipeType: Math.floor(Math.random() * tileSides / 2),
        rotation: Math.floor(Math.random() * tileSides),
        id: tileId
      };
      row[col] = tileId;
      tiles[tileId] = tile;
    }
  }

  return { tiles, rows };
}

class App extends Component {
  constructor({ dispatch }) {
    super();
    const { tiles, rows } = generateRandomBoard(boardHeight, boardWidth);
    dispatch(setBoard(rows));
    dispatch(setTiles(tiles));
    dispatch(setTileSides(tileSides)); // this should work without too since it is default;
  }

  render() {
    return <Board />;
  }
}

export default connect()(App);
