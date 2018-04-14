import React from "react";
import { connect } from "react-redux";

import Home from "./Home";
import GameType from "./GameType";
import { levelGenerator } from "../../functions/level-generator";
import { closeMenu, openMenu, setGameType, startLevel } from "../../actionCreators";
import About from "./About";

class MenuController extends React.Component {
  closeMenu = () => this.props.dispatch(closeMenu());
  openMenu = menu => this.props.dispatch(openMenu(menu));

  render() {
    const { openMenus, gameStarted, level, dispatch } = this.props;

    const clickPlayButton = () => {
      dispatch(startLevel(levelGenerator(level)));
      this.closeMenu();
    };

    const clickSetGameType = (type: "portrait" | "landscape") => {
      dispatch(setGameType(type));
      this.closeMenu();
    };

    switch (openMenus[openMenus.length - 1]) {
      case "home":
        return (
          <Home
            gameStarted={gameStarted}
            clickPlayButton={clickPlayButton}
            clickContinueButton={this.closeMenu}
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
  gameStarted: state.game.gameStarted,
  // gameType: state.game.gameType,
  level: state.game.level,
  openMenus: state.game.openMenus,
});
export default connect(mapStateToProps)(MenuController);
