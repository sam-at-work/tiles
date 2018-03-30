import React from "react";
import Tile from "components/Tile";
import { connect } from "react-redux";

const Board = ({ board }) => {
  return <div>{board.map(row => <Row row={row} />)}</div>;
};

const Row = ({ row }) => <div>{row.map(tileId => <Tile id={tileId} />)}</div>;

const mapStateToProps = state => ({
  board: state.board
});

export default connect(mapStateToProps)(Board);
