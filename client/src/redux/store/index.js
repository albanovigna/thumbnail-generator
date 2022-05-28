// import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";
import { reduxBatch } from "@manaflair/redux-batch";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
  enhancers: [reduxBatch],
});

export default store;
