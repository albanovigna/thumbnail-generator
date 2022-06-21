import { POST_IMAGE, REMOVE_URLS } from "../actions";

const initialState = {
  urls: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_IMAGE:
      return { ...state, urls: action.info };
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
