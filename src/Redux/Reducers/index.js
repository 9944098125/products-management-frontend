import { combineReducers } from "redux";

import alert from "./alert";
import registration from "./registration";
import login from "./login";
import shops from "./shops";
import products from "./products";
import cart from "./cart";

export default combineReducers({
  alert,
  registration,
  login,
  shops,
  products,
  cart,
});
