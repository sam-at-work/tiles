// @flow

import styled from "styled-components";
import React from "react";

const tileWidth = "200px";
const tileHeight = tileWidth;
const tileSides = 4;

const Tile = styled.div`
  display: inline-block;
  width: ${tileWidth};
  height: ${tileHeight};
  margin: 5px;
  transform: rotate(${props => props.rotation}turn);
  transition: transform 1s; /* dump */
  overflow: hidden;
  will-change: transform;
`;

// const Pipe = styled.div`
//   position: absolute;
//   height: 50%;
//   width: 50%;
//   background-color: aqua;
//   &:before {
//     content: "";
//     position: absolute;
//     height: 100%;
//     width: 100%;
//     border: 1px solid black;
//     border-radius: 50%;
//     left: -50%;
//     top: -50%;
//   }
//   &:after {
//     content: "";
//     position: absolute;
//     height: 110%;
//     width: 110%;
//     border: 1px solid black;
//     border-radius: 50%;
//     left: -55%;
//     top: -55%;
//   }
// `;

const Pattern = styled.div`
  width: 100%;
  height: 100%;
  background-color: sandybrown;

  .water {
    position: absolute;
    background-color: lightblue;
    height: 105%;
    width: 105%;
    top: -50%;
    left: -50%;
    clip-path: circle(50%);
  }

  .inner-pattern {
    position: absolute;
    background-color: sandybrown;
    height: 95%;
    width: 95%;
    top: -50%;
    left: -50%;
    clip-path: circle(50%);
  }

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
  //.outer-circle {
  //  position: absolute;
  //  background-color: pink;
  //  height: 100%;
  //  width: 100%;
  //  border-radius: 50%;
  //  top: -50%;
  //  left: -50%;
  //}
`;

const Pipe = () => (
  <Pattern>
    <div className={"water"}>dsa</div>
    <div className={"inner-pattern"}>dsa</div>
    <div className={"cross-hairs"} />
  </Pattern>
);

export default class FunctionalTile extends React.Component<
  {},
  { rotation: number }
> {
  state = {
    rotation: Math.floor(Math.random() * tileSides)
  };

  type: number; // number of edges between entering and exiting of pipe.

  constructor() {
    super(constructor);
    this.type = Math.floor(Math.random() * tileSides / 2);
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
        <Pipe type={this.type} />
      </Tile>
    );
  }
}
