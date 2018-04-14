import React from "react";

import Menu from "../Menu/Menu";
import Title from "../Menu/Title";
import Button from "../Menu/Button";

export default function LevelComplete({ loadLevel }) {
  return (
    <Menu>
      <Title>Level Complete</Title>
      <Button onClick={loadLevel}>Next Level</Button>
    </Menu>
  );
}
