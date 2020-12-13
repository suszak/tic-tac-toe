import { combineReducers, createStore } from "redux";
import { formReducer } from "./reducers/formReducer";
import { userReducer } from "./reducers/userReducer";
import { tablesReducer } from "./reducers/tablesReducer";
import { usersListReducer } from "./reducers/usersListReducer";
import { socketReducer } from "./reducers/socketReducer";

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  tables: tablesReducer,
  usersList: usersListReducer,
  socket: socketReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
