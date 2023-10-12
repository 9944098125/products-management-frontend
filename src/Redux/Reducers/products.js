import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL } from "../Actions/Types";

const initialState = {
  products: [],
  message: "",
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        products: action.payload.products,
        message: action.payload.message,
      };
    case GET_PRODUCTS_FAIL:
      return {
        message: action.payload,
        products: [],
      };
    default:
      return state;
  }
}
