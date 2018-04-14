const defaultState = {
  gameStarted: false,
  level: 1,
  gameType: "landscape",
  openMenus: ["home", "game-type"],
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
    default:
      return state;
  }
}
