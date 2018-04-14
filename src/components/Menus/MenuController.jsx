import React from "react";
import { connect } from "react-redux";

import Home from "./Home";
import GameType from "./GameType";
import { levelGenerator } from "../../functions/level-generator";
import { setGameType, startLevel } from "../../actionCreators";
import About from "./About";

class MenuController extends React.Component {
  state = {
    openMenus: ["home"],
  };

  closeMenu = () =>
    this.setState(prevState => ({
      openMenus: prevState.openMenus.slice(0, -1),
    }));

  openMenu = menu =>
    this.setState(prevState => ({
      openMenus: [...prevState.openMenus, menu],
    }));

  render() {
    const { level, dispatch } = this.props;

    const clickStartButton = () => {
      dispatch(startLevel(levelGenerator(level)));
      this.closeMenu();
    };

    const clickSetGameType = (type: "portrait" | "landscape") => {
      dispatch(setGameType(type));
      this.closeMenu();
    };

    switch (this.state.openMenus[this.state.openMenus.length - 1]) {
      case "home":
        return (
          <Home
            clickStartButton={clickStartButton}
            clickSettingsButton={() => this.openMenu("game-type")}
            clickAboutButton={() => this.openMenu("about")}
          />
        );
      case "game-type":
        return (
          <GameType
            landscapeButtonClick={() => clickSetGameType("landscape")}
            portraitButtonClick={() => clickSetGameType("portrait")}
          />
        );
      case "about":
        return <About closeMenu={this.closeMenu} />;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  gameType: state.game.gameType,
  level: state.game.level,
});
export default connect(mapStateToProps)(MenuController);
