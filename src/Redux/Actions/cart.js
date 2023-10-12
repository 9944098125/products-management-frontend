import { ADD_ITEM, REMOVE_ITEM } from "./Types";

export const addItemToCart = (product) => (dispatch, getState) => {
  dispatch({
    type: ADD_ITEM,
    payload: product,
  });
};

export const removeItemFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM,
    payload: productId,
  });
};
