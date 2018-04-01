import React from "react";
import Tile from "src/components/Tile";
import { connect } from "react-redux";

const Board = ({ rows }) => {
  return <div>{rows.map(row => <Row key={row} row={row} />)}</div>;
};

const Row = ({ row }) => <div>{row.map(tileId => <Tile key={tileId} id={tileId} />)}</div>;

const mapStateToProps = state => ({
  rows: state.rows
});

export default connect(mapStateToProps)(Board);
