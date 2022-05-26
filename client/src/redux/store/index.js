import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: [composeWithDevTools(thunk)],
});

export default store;
