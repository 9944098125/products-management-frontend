import {
  CREATE_SHOP_FAIL,
  CREATE_SHOP_START,
  CREATE_SHOP_SUCCESS,
  DELETE_SHOP_FAIL,
  DELETE_SHOP_SUCCESS,
  GET_SHOPS_FAIL,
  GET_SHOPS_START,
  GET_SHOPS_SUCCESS,
} from "../Actions/Types";

const initialState = {
  loading: false,
  shops: [],
  message: "",
};

export default function shops(state = initialState, action) {
  switch (action.type) {
    case CREATE_SHOP_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case CREATE_SHOP_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case GET_SHOPS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        loading: false,
        shops: action.payload.shops,
        message: action.payload.message,
      };
    case GET_SHOPS_FAIL:
      return {
        ...state,
        loading: false,
        shops: [],
        message: action.payload.message,
      };
    case DELETE_SHOP_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case DELETE_SHOP_FAIL:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}
