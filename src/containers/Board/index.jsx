import React from "react";
import Tile from "src/components/Tile";
import { connect } from "react-redux";
import styled from "styled-components";

import brewery from "./brewery.png"; // Tell Webpack this JS file uses this image
import pub from "./pub.png"; // Tell Webpack this JS file uses this image

const BoardWrapper = styled.div`
  --grid-gap: ${props => (props.width * props.height > 9 ? "5px" : "10px")};
  @media (min-width: 600px) {
    --grid-gap: ${props => (props.width * props.height > 9 ? "8px" : "12px")};
  }

  max-width: calc(
    ${props => props.tileRatio * 100}vh - ${props => props.gapRatio} * var(--grid-gap)
  );
  margin-left: auto;
  margin-right: auto;

  .grid {
    // make these global
    touch-action: manipulation; // stop ios safari zooming in
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); // remove grey background in ios safari on click
    user-select: none; // make global - stops text from being selected in debug mode

    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: var(--grid-gap);
  }

  .location {
    align-self: end; // make locations appear aligned to bottom of cell;
    position: relative;

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

const Board = ({ idToTileState, width, height, pathComplete }) => {
  // NOTE here height is height of tiles.
  // actual height of board is height + 1 for the top row with locations.

  const tileRatio = width / (height + 1); // row and col ratio
  // I have no idea why or how this gapRatio works - but it does!
  const gapRatio = 1 - width / height; // grid gap ratio

  return (
    <BoardWrapper width={width} height={height} tileRatio={tileRatio} gapRatio={gapRatio}>
      <div className="grid">
        <div className="location brewery">
          <img src={brewery} />
        </div>
        <div className={"placeHolder"} />
        <div className="location pub">
          <img src={pub} />
        </div>

        {Object.values(idToTileState).map(tile => <Tile key={tile.id} tile={tile} />)}
      </div>
      {pathComplete ? <div className={"game-over"}>Game Over!</div> : null}
    </BoardWrapper>
  );
};

const mapStateToProps = state => ({
  idToTileState: state.idToTileState,
  width: state.width,
  height: state.height,
  pathComplete: state.pathComplete
});

export default connect(mapStateToProps)(Board);
