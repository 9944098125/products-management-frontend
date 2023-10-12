import { ADD_ITEM, REMOVE_ITEM } from "../Actions/Types";

const initialState = {
  cart: [],
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((product) => product[0] !== action.payload),
      };
    default:
      return state;
  }
}
