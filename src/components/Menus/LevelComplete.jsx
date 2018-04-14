import React from "react";

import Menu from "../Menu/Menu";
import Title from "../Menu/Title";
import Button from "../Menu/Button";

export default class LevelComplete extends React.Component {
  state = { level: this.props.level };
  render() {
    return (
      <Menu>
        <Title>Level {this.state.level - 1} Complete</Title>
        <Button onClick={this.props.loadLevel}>Next Level</Button>
      </Menu>
    );
  }
}
