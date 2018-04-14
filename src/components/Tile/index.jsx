// @flow

/*
For reference: has amazing svg animation of water https://stackoverflow.com/questions/29738787/filling-water-animation/29740828#
*/

import styled from "styled-components";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TileDebugger from "./tile-debugger";
import { rotateTile } from "src/actionCreators";

const debug = false;

const Tile = styled.div`
  position: relative;
  padding-bottom: 100%; // 1:1 aspect ratio hack
  cursor: pointer;

  .pattern {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(244, 164, 96, 0.7); //sandybrown;
    transform: rotate(${props => props.rotation}turn);
    transition: transform ${props => props.rotationTime}ms;
    will-change: transform;

    .pipe {
      background-color: ${props => {
        if (props.connected && props.pathComplete) return "yellow";
        else if (props.connected) return "lightblue";
        else return "black";
      }};
      transition-property: background-color;
      transition-duration: ${props => (props.connected ? 200 : 500)}ms;
      transition-delay: ${props => props.animationDelay}ms;
      height: 100%;
      width: 100%;
      clip-path: ${props => props.clipPath};
    }
  }
`;

const clipPaths = {
  "4": [
    "polygon(45% 0, 55% 0, 57% 43%, 100% 45%, 100% 55%, 50% 50%, 45% 0)",
    "polygon(45% 0, 55% 0, 55% 100% , 45% 100% , 45% 0)",
  ],
};

function FunctionalTile({
  rotateTile,
  id,
  currentRotation,
  totalSides,
  pipeType,
  tileSideToVertex,
  ...props
}) {
  const onClick = (event: SyntheticEvent<HTMLDivElement> & { pageX: number }) => {
    const middleX = event.currentTarget.offsetWidth / 2;
    const clickX = event.pageX - event.currentTarget.offsetLeft;

    const rotation = clickX < middleX ? -1 : 1;
    rotateTile(id, rotation);
  };

  return (
    <Tile
      {...props}
      onClick={onClick}
      rotation={currentRotation / totalSides}
      clipPath={clipPaths[totalSides][pipeType]}
    >
      <div className={"pattern"}>
        <div className={"pipe"} />
      </div>

      {debug ? <TileDebugger edgeToVertex={tileSideToVertex} /> : null}
    </Tile>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps.tile,
    rotationTime: state.board.rotationTime,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ rotateTile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalTile);
