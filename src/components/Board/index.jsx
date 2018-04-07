import React from "react";
import Tile from "src/components/Tile/index";
import { connect } from "react-redux";

import BoardWrapper from "./styles";
import brewery from "./images/brewery.png"; // Tell Webpack this JS file uses this image
import pub from "./images/pub.png";
import { startGame } from "../../actionCreators/index"; // Tell Webpack this JS file uses this image

const Board = ({ idToTileState, width, height, pathComplete, gameStarted, dispatch }) => {
  // NOTE here height is height of tiles.
  // actual height of board is height + 1 for the top row with locations.
  if (!gameStarted) {
    return (
      <div>
        Ready to play?
        <button onClick={() => dispatch(startGame())}>Yes!</button>
      </div>
    );
  }

  const tileRatio = width / (height + 1); // row and col ratio
  // I have no idea why or how this gapRatio works - but it does!
  const gapRatio = 1 - tileRatio; // grid gap ratio

  return (
    <BoardWrapper width={width} height={height} tileRatio={tileRatio} gapRatio={gapRatio}>
      <div className="grid">
        <div className="location brewery" style={{ paddingBottom: "calc(190 / 265 * 100%)" }}>
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
  idToTileState: state.board.idToTileState,
  width: state.board.width,
  height: state.board.height,
  pathComplete: state.board.pathComplete,
  gameStarted: state.game.gameStarted,
});

export default connect(mapStateToProps)(Board);
