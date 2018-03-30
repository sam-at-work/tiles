// @flow

/*
For reference: has amazing svg animation of water https://stackoverflow.com/questions/29738787/filling-water-animation/29740828#
*/

import styled from "styled-components";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { rotateTile } from "src/actionCreators";

const tileWidth = "200px";
const tileHeight = tileWidth;
const debug = true;

const Tile = styled.div`
  display: inline-block;
  width: ${tileWidth};
  height: ${tileHeight};
  margin: 5px;
  transform: rotate(${props => props.rotation}turn);
  transition: transform 1s;
  overflow: hidden;
  will-change: transform;
`;

const clipPaths = {
  "4": [
    "polygon(0 45%, 0 55%, 50% 50%, 55% 0, 45% 0, 43% 43%, 0 45%)",
    "polygon(0 45%, 0 55%, 100% 55%, 100% 45%, 0 45%)"
  ]
};

console.log(clipPaths[4][1]);

const Pattern = styled.div`
  width: 100%;
  height: 100%;
  background-color: sandybrown;

  .pipe {
    position: absolute;
    background-color: lightblue;
    height: 100%;
    width: 100%;
    clip-path: ${props => props.clipPath};
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
`;

const Pipe = props => (
  <Pattern {...props}>
    <div className={"pipe"}>dsa</div>
    {debug ? <div className={"cross-hairs"} /> : null}
  </Pattern>
);

function FunctionalTile({ pipeType, rotation, id, tileSides, rotateTile }) {
  const onClick = (event: SyntheticEvent<HTMLDivElement> & { pageX: number }) => {
    const middleX = event.currentTarget.offsetWidth / 2;
    const clickX = event.pageX - event.currentTarget.offsetLeft;

    const rotation = clickX < middleX ? -1 : 1;
    rotateTile(id, rotation);
  };

  return (
    <Tile onClick={onClick} rotation={rotation / tileSides}>
      <Pipe clipPath={clipPaths[tileSides][pipeType]} />
    </Tile>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    ...state.tiles[ownProps.id],
    tileSides: state.settings.tileSides
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ rotateTile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalTile);
