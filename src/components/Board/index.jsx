import React from "react";
import Tile from "src/components/Tile/index";
import { connect } from "react-redux";

import BoardWrapper from "./styles";
import brewery from "./images/brewery.png"; // Tell Webpack this JS file uses this image
import pub from "./images/pub.png"; // Tell Webpack this JS file uses this image

// for random tree hack
let prevWidth = -1,
  prevHeight = -1,
  treeCol = 2;

const Board = ({ idToTileState, width, height, ...props }) => {
  // NOTE here height is height of tiles.
  // actual height of board is height + 1 for the top row with locations.
  const tileRatio = width / (height + 1); // row and col ratio
  // I have no idea why or how this gapRatio works - but it does!
  const gapRatio = 1 - tileRatio; // grid gap ratio

  // for random tree hack
  if (width !== prevWidth || height !== prevHeight) {
    treeCol = 2 + Math.floor(Math.random() * (width - 2));
    prevWidth = width;
    prevHeight = height;
  }

  return (
    <BoardWrapper
      {...props}
      width={width}
      height={height}
      tileRatio={tileRatio}
      gapRatio={gapRatio}
    >
      <div className="locations-wrapper">
        <div className="grid locations">
          <div className="location brewery" style={{ paddingBottom: "calc(190 / 265 * 100%)" }}>
            <img src={brewery} />
          </div>
          <div className="placeHolder" />
          <div className="location tree" style={{ gridColumn: treeCol }} />
          <div className="location pub">
            <img src={pub} />
          </div>
        </div>
      </div>

      <div className={"tiles-wrapper"}>
        <div className="grid tiles">
          {Object.values(idToTileState).map(tile => (
            <Tile key={tile.id} tile={tile} pathComplete={props.pathComplete} />
          ))}
        </div>
      </div>
    </BoardWrapper>
  );
};

const mapStateToProps = state => ({
  ...state.board,
});

export default connect(mapStateToProps)(Board);
