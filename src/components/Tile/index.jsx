// @flow

/*
For reference: has amazing svg animation of water https://stackoverflow.com/questions/29738787/filling-water-animation/29740828#
*/

import styled from "styled-components";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { rotateTile } from "src/actionCreators";

const debug = false;

const Tile = styled.div`
  display: inline-block;
  position: relative;
  user-select: none; // disable highligting on phones - not working

  //width: 100%;
  //content: "";
  //height: 0;

  padding-bottom: 100%;
  cursor: pointer;
  // cursor: ${props => (props.canRotate ? "pointer" : "auto")};
  // pointer-events: ${props => (props.canRotate ? "auto" : "none")};

  .pattern {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: sandybrown;
    transform: rotate(${props => props.rotation}turn);
    transition: transform ${props => props.rotationTime}ms;
    will-change: transform;

    .pipe {
      background-color: ${props => (props.connected ? "lightblue" : "black")};
      transition: background-color 200ms ${props => props.animationDelay}ms;
      height: 100%;
      width: 100%;
      clip-path: ${props => props.clipPath};
    }
  }

  // for debug mode
  .cross-hairs {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 1px;
      height: 100%;
      background-color: black;
    }
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: black;
    }
  }

  .pos {
    position: absolute;
  }

  .top {
    top: 0;
    left: 50%;
  }

  .right {
    right: 0;
    top: 50%;
  }

  .bottom {
    bottom: 0;
    left: 50%;
  }

  .left {
    top: 50%;
    left: 0;
  }
`;

const clipPaths = {
  "4": [
    "polygon(45% 0, 55% 0, 57% 43%, 100% 45%, 100% 55%, 50% 50%, 45% 0)",
    "polygon(45% 0, 55% 0, 55% 100% , 45% 100% , 45% 0)"
  ]
};

function FunctionalTile({
  rotateTile,
  id,
  currentRotation,
  tileSides,
  pipeType,
  edgeToVertex,
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
      rotation={currentRotation / tileSides}
      clipPath={clipPaths[tileSides][pipeType]}
    >
      <div className={"pattern"}>
        <div className={"pipe"} />
      </div>

      {debug ? (
        <div className={"cross-hairs"}>
          <div className={"pos top"}>{edgeToVertex[0]}</div>
          <div className={"pos right"}>{edgeToVertex[1]}</div>
          <div className={"pos bottom"}>{edgeToVertex[2]}</div>
          <div className={"pos left"}>{edgeToVertex[3]}</div>
        </div>
      ) : null}
    </Tile>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    ...state.tiles[ownProps.id],
    rotationTime: state.rotationTime
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ rotateTile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalTile);
