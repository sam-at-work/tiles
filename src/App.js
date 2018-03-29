import React, { Component } from "react";
import "./App.css";
import Tile from "components/Tile";

class App extends Component {
  render() {
    return (
      <div>
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
    );
  }
}

export default App;
