const defaultState = {
  gameStarted: false,
  level: 1,
  gameType: "landscape",
  openMenus: ["home", "game-type"],
  version: process.env.REACT_APP_VERSION,
};

export default function game(state = defaultState, action) {
  switch (action.type) {
    case "START_LEVEL":
      return { ...state, level: ++state.level, gameStarted: true };
    case "SET_GAME_TYPE": {
      return { ...state, gameType: action.gameType };
    }
    case "OPEN_MENU": {
      return { ...state, openMenus: [...state.openMenus, action.menu] };
    }
    case "CLOSE_MENU": {
      return { ...state, openMenus: state.openMenus.slice(0, -1) };
    }
    case "CLOSE_ALL_MENUS": {
      return { ...state, openMenus: [] };
    }
    case "RESTART": {
      return {
        ...state,
        gameStarted: false,
        level: 1,
      };
    }
    default:
      return state;
  }
}
