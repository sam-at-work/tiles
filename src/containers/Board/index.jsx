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
    user-select: none;

    @media (max-width: 600px) {
      grid-gap: 5px;
      margin-top: 5px;
    }
  }

  .location {
    align-self: end; // make locations appear aligned to bottom of cell;
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
    display: ${props => (props.width <= 2 ? "none" : "block")};
    grid-column-start: 2;
    grid-column-end: -2;
  }

  .game-over {
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 0, 0, 0.2);
  }
`;

const Board = ({ rows, dimensions, pathComplete }) => {
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
      {pathComplete ? <div className={"game-over"}>Game Over!</div> : null}
    </BoardWrapper>
  );
};

const mapStateToProps = state => ({
  rows: state.rows,
  dimensions: state.dimensions,
  pathComplete: state.pathComplete
});

export default connect(mapStateToProps)(Board);
