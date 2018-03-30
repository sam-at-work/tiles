import React from "react";
import Tile from "src/components/Tile";
import { connect } from "react-redux";

const Board = ({ board }) => {
  return <div>{board.map((row, index) => <Row key={index} row={row} />)}</div>;
};

const Row = ({ row }) => <div>{row.map(tileId => <Tile key={tileId} id={tileId} />)}</div>;

const mapStateToProps = state => ({
  board: state.board
});

export default connect(mapStateToProps)(Board);
