import React from 'react';
import Tile from 'components/Tile'

const boardHeight = 3;
const boardWidth = boardHeight;

const boardHeightArray = [...Array(boardHeight)];
const boardWidthArray = [...Array(boardWidth)];

const Row = () => (
  <div>{boardWidthArray.map(()=><Tile/>)}</div>
);

export default () => {
  return (
    <div>
      {boardHeightArray.map(()=><Row/>)}
    </div>
  )
}