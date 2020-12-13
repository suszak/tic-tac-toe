import * as types from "../types/socketTypes";

const defaultState = {
  socketRef: null,
};

export const socketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SOCKET:
      return {
        socketRef: action.newSocketRef,
      };

    case types.UNSET_SOCKET:
      return {
        socketRef: null,
      };

    default:
      return state;
  }
};
