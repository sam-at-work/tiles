const defaultState = {
  gameStarted: false,
  level: 1,
};

export default function game(state = defaultState, action) {
  switch (action.type) {
    case "START_GAME":
      return { ...state, gameStarted: true };
    default:
      return state;
  }
}
