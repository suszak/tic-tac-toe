import * as types from "../types/formTypes.js";

export const changeFormType = (newFormType) => {
  return {
    type: types.TYPE_CHANGED,
    newFormType,
  };
};
