import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../Actions/Types";

const initialState = {
  loading: false,
  user: null,
  errMessage: "",
  isAuthenticated: false,
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("pma-user", JSON.stringify(action.payload.user));
      localStorage.setItem("pma-isAuthenticated", true);
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    case LOGOUT:
      localStorage.removeItem("pma-user");
      localStorage.removeItem("pma-isAuthenticated");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
