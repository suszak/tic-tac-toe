import * as types from "../types/userTypes.js";

const defaultState = {
  login: null,
  error: null,
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGGED_IN:
      return {
        ...state,
        login: action.login,
        error: null,
      };

    case types.SET_ERROR:
      return {
        ...state,
        login: null,
        error: action.error,
      };

    default:
      return state;
  }
};
