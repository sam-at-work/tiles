const tiles = (state = {}, action) => {
  switch (action.type) {
    case "SET_TILES":
      return action.tiles;
    case "ROTATE_TILE":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          rotation: state[action.id].rotation + action.rotation
        }
      };
    case "SET_TILE_CONNECTED":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          connected: true
        }
      };
    case "SET_TILE_DISCONNECTED":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          connected: false
        }
      };
    default:
      return state;
  }
};

export default tiles;
