import { POST_IMAGE, ADD_IMAGE, REMOVE_IMAGE } from "../actions";

const initialState = {
  image: [],
  blob: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_IMAGE:
      return { ...state, blob: action.info };
    case ADD_IMAGE:
      return { ...state, image: state.image.concat(action.payload) };
    case REMOVE_IMAGE:
      return {
        ...state,
        image: state.image.filter((item) => item !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
