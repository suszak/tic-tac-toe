import * as types from "../types/socketTypes";

export const socketSet = (newSocketRef) => {
  return {
    type: types.SET_SOCKET,
    newSocketRef,
  };
};

export const socketUnset = () => {
  return {
    type: types.UNSET_SOCKET,
  };
};
