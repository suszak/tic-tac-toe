import * as types from "../types/usersListTypes.js";

export const updateList = (usersListArray) => {
  return {
    type: types.LIST_UPDATED,
    usersListArray,
  };
};
