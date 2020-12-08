import * as types from "../types/tablesTypes.js";

export const UpdateTables = (newTables) => {
  return {
    type: types.UPDATE_TABLES,
    newTables,
  };
};
