import { SUCCESS, ERROR, CLEAR } from "../Actions/Types";

export default function alert(state = {}, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        type: "success",
        message: action.message,
      };
    case ERROR:
      return {
        type: "error",
        message: action.message,
      };
    case CLEAR:
      return {
        type: "clear",
      };
    default:
      return state;
  }
}
