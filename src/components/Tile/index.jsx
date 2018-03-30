// @flow

/*
For reference: has amazing svg animation of water https://stackoverflow.com/questions/29738787/filling-water-animation/29740828#
*/

import styled from "styled-components";
import React from "react";

const tileWidth = "200px";
const tileHeight = tileWidth;
const tileSides = 4;
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

export default class FunctionalTile extends React.Component<
  {},
  { rotation: number }
> {
  state = {
    rotation: Math.floor(Math.random() * tileSides)
  };

  // number of edges between entering and exiting of pipe. 0 <= x <= (tileSides / 2 - 1)
  pipeType: number;

  constructor(props: {}) {
    super(props);
    this.pipeType = Math.floor(Math.random() * tileSides / 2);
  }

  onClick = (event: SyntheticEvent<HTMLDivElement> & { pageX: number }) => {
    const middleX = event.currentTarget.offsetWidth / 2;
    const clickX = event.pageX - event.currentTarget.offsetLeft;

    this.setState(prevState => {
      if (clickX < middleX) {
        return { rotation: prevState.rotation - 1 };
      }
      return { rotation: prevState.rotation + 1 };
    });
  };

  render() {
    const { rotation } = this.state;
    return (
      <Tile onClick={this.onClick} rotation={rotation / tileSides}>
        <Pipe clipPath={clipPaths[tileSides][this.pipeType]} />
      </Tile>
    );
  }
}
