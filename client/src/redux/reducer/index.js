import { POST_IMAGE, ADD_IMAGE, REMOVE_IMAGE, REMOVE_URLS } from "../actions";

const initialState = {
  image: [],
  urls: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_IMAGE:
      return { ...state, urls: action.info };
    case ADD_IMAGE:
      return { ...state, image: state.image.concat(action.payload) };
    case REMOVE_IMAGE:
      return {
        ...state,
        image: state.image.filter((item) => item !== action.payload),
      };
    case REMOVE_URLS:
      return {
        ...state,
        urls: [],
      };
    default:
      return state;
  }
};

export default rootReducer;
