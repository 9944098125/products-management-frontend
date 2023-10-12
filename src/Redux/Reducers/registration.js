import {
  REGISTRATION_FAIL,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
} from "../Actions/Types";

const initialState = {
  loading: false,
  message: "",
};

export default function registration(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_START:
      return {
        loading: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case REGISTRATION_FAIL:
      return {
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
}
