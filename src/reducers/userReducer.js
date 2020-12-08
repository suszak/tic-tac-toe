import * as types from "../types/userTypes.js";

const defaultState = {
  login: null,
  isAdmin: null,
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGGED_IN:
      return {
        login: action.login,
        isAdmin: action.isAdmin,
      };

    case types.LOGGED_OUT:
      return {
        login: null,
        isAdmin: null,
      };

    default:
      return state;
  }
};
