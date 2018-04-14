import React from "react";
import { connect } from "react-redux";

import Menu from "../Menu/Menu";
import Title from "../Menu/Title";
import Button from "../Menu/Button";

export default function GameType({
  gameStarted,
  clickPlayButton,
  clickContinueButton,
  clickSettingsButton,
  clickAboutButton,
}) {
  return (
    <Menu>
      <Title>Beer Pipes</Title>
      {gameStarted ? (
        <Button onClick={clickContinueButton}>Continue</Button>
      ) : (
        <Button onClick={clickPlayButton}>Play</Button>
      )}
      <Button onClick={clickSettingsButton}>Settings</Button>
      <Button onClick={clickAboutButton}>About</Button>
    </Menu>
  );
}
