import { combineReducers, createStore } from "redux";
import { formReducer } from "./reducers/formReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
