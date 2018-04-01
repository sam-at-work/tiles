import React from "react";
import Tile from "src/components/Tile";
import { connect } from "react-redux";
import styled from "styled-components";

import brewery from "./brewery.png"; // Tell Webpack this JS file uses this image

const BoardWrapper = styled.div`
  .tiles {
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 10px;
  }

  .brewery {
    grid-column-start: 0;
    grid-column-end: last;
  }
`;

const Board = ({ rows, dimensions }) => {
  return (
    <BoardWrapper width={dimensions.width}>
      <img className="brewery" src={brewery} />
      <div className="tiles">
        {rows.map(row => row.map(tileId => <Tile key={tileId} id={tileId} />))}
      </div>
    </BoardWrapper>
  );
};

const mapStateToProps = state => ({
  rows: state.rows,
  dimensions: state.dimensions
});

export default connect(mapStateToProps)(Board);
