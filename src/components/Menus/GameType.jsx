import React from "react";
import { connect } from "react-redux";

import Menu from "../Menu/Menu";
import Title from "../Menu/Title";
import Button from "../Menu/Button";

export default function GameType({ closeMenu, landscapeButtonClick, portraitButtonClick }) {
  return (
    <Menu>
      <Title>Game Mode</Title>
      <Button onClick={landscapeButtonClick}>Desktop</Button>
      <Button onClick={portraitButtonClick}>Phone</Button>
      <Button onClick={closeMenu}>Cancel</Button>
    </Menu>
  );
}
