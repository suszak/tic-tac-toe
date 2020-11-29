import * as types from "../types/userTypes.js";

export const LoginUser = (login) => {
  return {
    type: types.LOGGED_IN,
    login,
  };
};