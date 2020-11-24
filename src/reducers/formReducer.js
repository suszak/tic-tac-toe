import * as types from "../types/formTypes";

const defaultState = {
  formType: "login",
};

export const formReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.TYPE_CHANGED:
      return {
        formType: action.newFormType,
      };

    default:
      return state;
  }
};
