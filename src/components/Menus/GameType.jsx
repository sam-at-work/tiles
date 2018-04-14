import React from "react";
import { connect } from "react-redux";

import Menu from "../Menu/Menu";
import Title from "../Menu/Title";
import Button from "../Menu/Button";

export default function GameType({ landscapeButtonClick, portraitButtonClick }) {
  return (
    <Menu>
      <Title>Game Mode</Title>
      <Button onClick={landscapeButtonClick}>Landscape</Button>
      <Button onClick={portraitButtonClick}>Portrait</Button>
    </Menu>
  );
}
