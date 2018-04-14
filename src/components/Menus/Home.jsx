import React from "react";
import { connect } from "react-redux";

import Menu from "../Menu/Menu";
import Title from "../Menu/Title";
import Button from "../Menu/Button";

export default function GameType({ clickStartButton, clickSettingsButton, clickAboutButton }) {
  return (
    <Menu>
      <Title>Beer Pipes</Title>
      <Button onClick={clickStartButton}>Play</Button>
      <Button onClick={clickSettingsButton}>Settings</Button>
      <Button onClick={clickAboutButton}>About</Button>
    </Menu>
  );
}
