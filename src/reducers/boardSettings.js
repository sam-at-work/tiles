const defaultSettings = { tileSides: 4 };

const settings = (state = defaultSettings, action) => {
  switch (action.type) {
    case "SET_TILE_SIDES":
      return { ...state, tileSides: action.sides };
    default:
      return state;
  }
};

export default settings;
