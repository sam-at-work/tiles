const tiles = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TILE":
      const tile = {
        rotation: action.rotation,
        connected: false
      };
      return { ...state, id: tile };
    case "ROTATE_TILE":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          rotation: state[action.id].rotation + action.rotation
        }
      };
    case "SET_CONNECTED":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          connected: true
        }
      };
    case "SET_DISCONNECTED":
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
