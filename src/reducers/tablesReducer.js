import * as types from "../types/tablesTypes.js";

const defaultState = {
  tables: [],
};

export const tablesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_TABLES:
      return {
        tables: [...action.newTables],
      };

    default:
      return state;
  }
};
