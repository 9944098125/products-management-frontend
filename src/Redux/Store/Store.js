import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../Reducers";
// we use applyMiddleware to intercept the actions before the execution reaches reducers.
// redux devtools extension provides a function to work with browser extension for redux
// redux thunk is given as middleware so that actions can perform their async functions
const middleware = [thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
