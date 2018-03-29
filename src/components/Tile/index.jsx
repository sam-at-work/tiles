// @flow

import styled from "styled-components";
import React from "react";

const tileWidth = "200px";
const tileHeight = tileWidth;
const tileSides = 5;

const Tile = styled.div`
  display: inline-block;
  width: ${tileWidth};
  height: ${tileHeight};
  background-color: red;
  margin: 5px;
  transform: rotate(${props => props.rotation}turn);
  transition: transform 1s;
`;

export default class FunctionalTile extends React.Component<
  {},
  { rotation: number }
> {
  tile: ?HTMLDivElement;

  state = {
    rotation: 0
  };

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
    return <Tile onClick={this.onClick} rotation={rotation / tileSides} />;
  }
}
