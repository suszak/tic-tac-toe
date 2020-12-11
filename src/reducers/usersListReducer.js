import * as types from "../types/usersListTypes.js";

const defaultState = [];

export const usersListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LIST_UPDATED:
      return action.usersListArray;

    default:
      return state;
  }
};
