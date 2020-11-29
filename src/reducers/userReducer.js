import * as types from "../types/userTypes.js";

const defaultState = {
  login: null,
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGGED_IN:
      return {
        login: action.login,
      };

    default:
      return state;
  }
};
