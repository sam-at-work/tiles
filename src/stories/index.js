import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import Tile from "../components/Tile";
import Board from "../components/Board";
import Menu from "../components/Menu/Menu";
import Title from "../components/Menu/Title";

storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />);

storiesOf("Button", module)
  .add("with text", () => <Button onClick={action("clicked")}>Hello Button</Button>)
  .add("with some emoji", () => <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>);

storiesOf("Tile", module).add("basic", () => <Tile />);
storiesOf("Board", module).add("basic", () => <Board />);

storiesOf("Menu", module).add("basic", () => (
  <Menu>
    <Title>Beer Pipes</Title>
    <Button>Play</Button>
    <Button>Settings</Button>
    <Button>About</Button>
  </Menu>
));
