const defaultState = {
  gameStarted: false,
  level: 1,
  gameType: "landscape",
};

export default function game(state = defaultState, action) {
  switch (action.type) {
    case "START_LEVEL":
      return { ...state, level: ++state.level, gameStarted: true };
    case "SET_GAME_TYPE": {
      return { ...state, gameType: action.gameType };
    }
    default:
      return state;
  }
}
