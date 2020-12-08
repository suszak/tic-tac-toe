import * as types from "../types/userTypes.js";

export const LoginUser = (login, isAdmin) => {
  return {
    type: types.LOGGED_IN,
    login,
    isAdmin,
  };
};

export const LogoutUser = () => {
  return {
    type: types.LOGGED_OUT,
  };
};
