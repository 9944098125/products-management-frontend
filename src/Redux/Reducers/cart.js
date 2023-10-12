import { ADD_ITEM, REMOVE_ITEM } from "../Actions/Types";

const initialState = {
  cart: [],
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      const existingItemIndex = state.cart.findIndex(
        (item) => item[0] === action.payload[0],
      );

      if (existingItemIndex !== -1) {
        // Item already exists in the cart; update its quantity
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex][4] += action.payload[4];
        return { ...state, cart: updatedCart };
      } else {
        // Item is not in the cart; add it
        action.payload[4] = 1;
        return { ...state, cart: [...state.cart, action.payload] };
      }
    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((product) => product[0] !== action.payload),
      };
    default:
      return state;
  }
}
