const defaultState = {
  gameStarted: false,
  level: 1,
};

export default function game(state = defaultState, action) {
  switch (action.type) {
    case "START_LEVEL":
      return { level: ++state.level, gameStarted: true };
    default:
      return state;
  }
}
