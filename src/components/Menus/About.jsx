import React from "react";
import { connect } from "react-redux";

import Menu from "../Menu/Menu";
import Title from "../Menu/Title";
import Button from "../Menu/Button";

export default function About({ closeMenu }) {
  return (
    <Menu>
      <Title>About</Title>
      <p>Game by Sam Grace</p>
      <p>Special Thanks and Inspiration - Tim VS</p>
      <Button onClick={closeMenu}>Close</Button>
    </Menu>
  );
}
