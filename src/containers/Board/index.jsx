import React from "react";
import Tile from "src/components/Tile";
import { connect } from "react-redux";
import styled from "styled-components";

import brewery from "./brewery.png"; // Tell Webpack this JS file uses this image
import pub from "./pub.png"; // Tell Webpack this JS file uses this image

const BoardWrapper = styled.div`
  .grid {
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 10px;
    margin-top: 10px;

    @media (max-width: 600px) {
      grid-gap: 5px;
      margin-top: 5px;
    }
  }

  .location {
    align-self: end;
    position: relative;
    //grid-column-start: 1;
    //grid-column-end: 1;
    //display: inline-block;

    //width: 100%;
    //content: "";
    //height: 0;
    > * {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .brewery {
    padding-bottom: calc(190 / 265 * 100%);
  }

  .pub {
    padding-bottom: 100%;
  }

  .placeHolder {
    grid-column-start: 2;
    grid-column-end: -2;
  }
`;

const Board = ({ rows, dimensions }) => {
  return (
    <BoardWrapper Wrapper width={dimensions.width}>
      <div className="grid">
        <div className="location brewery">
          <img src={brewery} />
        </div>
        <div className={"placeHolder"} />
        <div className="location pub">
          <img src={pub} />
        </div>

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
