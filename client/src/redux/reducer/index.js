import { POST_IMAGE, ADD_IMAGE } from "../actions";

const initialState = {
  image: [],
  blob: [],
};

function sortAsc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) return 1;

    if (b[field] > a[field]) return -1;

    return 0;
  });
}

function sortDesc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) return -1;

    if (b[field] > a[field]) return 1;

    return 0;
  });
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_IMAGE:
      return { ...state, blob: action.info };
    case ADD_IMAGE:
      return { ...state, image: state.image.concat(action.payload) };
    default:
      return state;
  }
};

export default rootReducer;
