import React from "react";
import Tile from "src/components/Tile";
import { connect } from "react-redux";
import styled from "styled-components";

const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 10px;
`;

const Board = ({ rows, dimensions }) => {
  return (
    <BoardWrapper width={dimensions.width}>
      {rows.map(row => row.map(tileId => <Tile key={tileId} id={tileId} />))}
    </BoardWrapper>
  );
};

const mapStateToProps = state => ({
  rows: state.rows,
  dimensions: state.dimensions
});

export default connect(mapStateToProps)(Board);
