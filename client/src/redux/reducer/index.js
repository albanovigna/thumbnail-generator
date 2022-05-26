const initialState = {
  countries: [],
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
    default:
      return state;
  }
};

export default rootReducer;
